// index.tsx
import React, { useState, useCallback, useMemo } from "react";
import { Card, Button, Table, message } from "antd";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "@tanstack/react-query";

import {
  useGroupsList,
  useGroupDetail,
  useNewStudents,
} from "../hooks/useGroupQueries";
import {
  useCreateGroup,
  useUpdateGroup,
  useDeleteGroup,
  useAddStudents,
} from "../hooks/useGroupMutations";
import { useGroupColumns } from "../components/GroupColumns";
import { CreateEditModal } from "../components/CreateEditModal";
import { AddStudentsModal } from "../components/AddStudentsModal";
import { InfoModal } from "../components/InfoModal";

import type {
  MainModalType,
  MyGroupsData,
  MyGroupsFormData,
} from "../utils/types";

const Groups = () => {
  const { t } = useTranslation();
  const qc = useQueryClient();

  // State'lar
  const [mainModal, setMainModal] = useState<MainModalType>(null);
  const [infoOpen, setInfoOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [editing, setEditing] = useState<MyGroupsData | null>(null);
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const [selectedStudentIds, setSelectedStudentIds] = useState<number[]>([]);

  // Queries
  const { data: groups, isLoading } = useGroupsList();
  const { data: groupDetail, isLoading: detailLoading } = useGroupDetail(
    selectedGroupId,
    infoOpen,
  );
  useNewStudents(addOpen); // enabled: addOpen

  // Mutations
  const createMutation = useCreateGroup(handleCloseAll);
  const updateMutation = useUpdateGroup(handleCloseAll);
  const deleteMutation = useDeleteGroup();
  const addStudentsMutation = useAddStudents(selectedGroupId, () => {
    setSelectedStudentIds([]);
    setAddOpen(false);
  });

  // Handlers
  function handleCloseAll() {
    setMainModal(null);
    setInfoOpen(false);
    setAddOpen(false);
    setEditing(null);
    setSelectedGroupId(null);
    setSelectedStudentIds([]);
  }

  const handleOpenCreate = () => {
    setEditing(null);
    setMainModal("create");
  };

  const handleOpenEdit = (row: MyGroupsData) => {
    setEditing(row);
    setMainModal("edit");
    setSelectedGroupId(row.id);
  };

  const handleOpenInfo = (row: MyGroupsData) => {
    setSelectedGroupId(row.id);
    setInfoOpen(true);
  };

  const handleOpenAddStudents = (row?: MyGroupsData) => {
    const gid = row?.id ?? selectedGroupId;
    if (!gid) return;

    setSelectedGroupId(gid);
    setSelectedStudentIds([]);
    setAddOpen(true);
  };


const handleSubmit = async (values: MyGroupsFormData) => {
  if (mainModal === "edit" && editing?.id) {
    const payload: Partial<MyGroupsFormData> = {};

    // name
    if (values.name !== editing.name) {
      payload.name = values.name;
    }

    // teacher
    if (values.teacher_id !== editing.teacher_id) {
      payload.teacher_id = values.teacher_id;
    }

    // students (array compare)
    const editingStudentIds =
      editing.students?.map((s: any) => s.id || s) || [];
    const newStudentIds = values.students || [];

    const isStudentsChanged =
      editingStudentIds.length !== newStudentIds.length ||
      editingStudentIds.some((id, i) => id !== newStudentIds[i]);

    if (isStudentsChanged) {
      payload.students = newStudentIds;
    }

    if (Object.keys(payload).length === 0) {
      message.info("Hech qanday o‘zgarish yo‘q");
      return;
    }
    updateMutation.mutate({ id: editing.id, payload });
  } else if (mainModal === "create") {
    createMutation.mutate(values);
  }
};

  const handleAddSubmit = (studentIds: number[]) => {
    if (!selectedGroupId) return;
    if (studentIds.length === 0) {
      message.warning("Avval student tanlang");
      return;
    }
    addStudentsMutation.mutate({ student_ids: studentIds });
  };

  // Table columns
  const columns = useGroupColumns({
    t,
    deletePending: deleteMutation.isPending,
    onAddStudents: handleOpenAddStudents,
    onEdit: handleOpenEdit,
    onInfo: handleOpenInfo,
    onDelete: (id) => deleteMutation.mutate(id),
  });

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  return (
    <Card
      title={t("groups")}
      extra={
        <Button type="primary" onClick={handleOpenCreate}>
          Guruh qo'shish
        </Button>
      }
    >
      <Table
        rowKey="id"
        columns={columns}
        loading={isLoading}
        dataSource={groups || []}
        pagination={false}
        scroll={{ x: 800 }}
      />

      <CreateEditModal
        open={mainModal === "create" || mainModal === "edit"}
        type={mainModal}
        editing={editing}
        loading={isSubmitting}
        onCancel={handleCloseAll}
        onSubmit={handleSubmit}
      />

      <AddStudentsModal
        open={addOpen}
        groupId={selectedGroupId}
        selectedIds={selectedStudentIds}
        loading={addStudentsMutation.isPending}
        onCancel={() => {
          setAddOpen(false);
          setSelectedStudentIds([]);
        }}
        onSubmit={handleAddSubmit}
        onSelectionChange={setSelectedStudentIds}
      />

      {infoOpen && (
        <InfoModal
          open={infoOpen}
          loading={detailLoading}
          groupDetail={groupDetail}
          onCancel={handleCloseAll}
        />
      )}
    </Card>
  );
};

export default Groups;
