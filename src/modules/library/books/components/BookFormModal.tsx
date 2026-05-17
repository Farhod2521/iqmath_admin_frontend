import { BASE_URL } from "@/libs/env";
import {
  BooksData,
  postBook,
  putBook,
  getBookCategories,
  getBookTags,
} from "@/services";
import i18n from "@/shared/i18n";
import { handleApiError } from "@/shared/utils/handleApiError";
import { UploadOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Space,
  Switch,
  Upload,
  UploadFile,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const { Item } = Form;

interface BookFormModalProps {
  open: boolean;
  onClose: () => void;
  editingBook?: BooksData | null;
}

const BookFormModal: React.FC<BookFormModalProps> = ({
  open,
  onClose,
  editingBook,
}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [coverFileList, setCoverFileList] = useState<UploadFile[]>([]);
  const [isOffline, setIsOffline] = useState(false);
  const queryClient = useQueryClient();

  // GET - Fetch categories
  const { data: categories } = useQuery({
    queryKey: ["bookCategories"],
    queryFn: getBookCategories,
  });

  // GET - Fetch tags
  const { data: tags } = useQuery({
    queryKey: ["bookTags"],
    queryFn: getBookTags,
  });

  // CREATE Mutation
  const createMutation = useMutation({
    mutationKey: ["createBook"],
    mutationFn: (formData: FormData) => postBook(formData as any),
    onSuccess: () => {
      toast.success(t("library.common.successCreate"));
      queryClient.invalidateQueries({ queryKey: ["library-books"] });
      handleClose();
    },
    onError: (error) => {
      handleApiError(error);
    },
  });

  // UPDATE Mutation
  const updateMutation = useMutation({
    mutationKey: ["updateBook"],
    mutationFn: ({ id, formData }: { id: number; formData: FormData }) =>
      putBook(id, formData as any),
    onSuccess: () => {
      toast.success(t("library.common.successUpdate"));
      queryClient.invalidateQueries({ queryKey: ["library-books"] });
      handleClose();
    },
    onError: (error) => {
      handleApiError(error);
    },
  });

  useEffect(() => {
    if (editingBook) {
      setIsOffline(editingBook.is_offline || false);
      form.setFieldsValue({
        name_uz: editingBook.name_uz,
        name_ru: editingBook.name_ru,
        description_uz: editingBook.description_uz,
        description_ru: editingBook.description_ru,
        category: editingBook?.category?.id,
        tags: editingBook.tags.map((tag) => tag?.id),
        price: editingBook.price,
        status: editingBook.status,
        is_offline: editingBook.is_offline || false,
        quantity: editingBook.quantity,
        date: editingBook.date,
        for_student: editingBook.for_student || false,
        for_teacher: editingBook.for_teacher || false,
      });

      // URL larni UploadFile formatiga o'tkazish
      if (editingBook.cover_image) {
        setCoverFileList([
          {
            uid: "-1",
            name: "cover_image",
            status: "done",
            url: BASE_URL + editingBook.cover_image,
          },
        ]);
      }
      if (editingBook.file && !editingBook.is_offline) {
        setFileList([
          {
            uid: "-1",
            name: "book_file",
            status: "done",
            url: BASE_URL + editingBook.file,
          },
        ]);
      }
    } else {
      resetForm();
    }
  }, [editingBook, open]);

  const resetForm = () => {
    form.resetFields();
    setFileList([]);
    setCoverFileList([]);
    setIsOffline(false);
    form.setFieldsValue({
      status: "active",
      is_offline: false,
    });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (values: any) => {
    const formData = new FormData();

    // Oddiy field'lar
    formData.append("name_uz", values.name_uz);
    formData.append("name_ru", values.name_ru);
    formData.append("description_uz", values.description_uz);
    formData.append("description_ru", values.description_ru);
    formData.append("category", values.category);
    formData.append("price", values.price);
    formData.append("status", values.status);
    formData.append("is_offline", values.is_offline);
    formData.append("date", values.date);
    formData.append("for_student", values.for_student);
    formData.append("for_teacher", values.for_teacher);

    // quantity (agar is_offline true bo'lsa)
    if (values.is_offline && values.quantity) {
      formData.append("quantity", values.quantity);
    }

    // Tags (array)
    if (values.tags && values.tags.length > 0) {
      values.tags.forEach((tagId: number) => {
        formData.append("tags", tagId.toString());
      });
    }

    // Cover image upload (yangi fayl bo'lsa)
    if (coverFileList[0]?.originFileObj) {
      formData.append("cover_image", coverFileList[0].originFileObj);
    }

    // File upload (faqat is_offline false bo'lganda va yangi fayl bo'lsa)
    if (!values.is_offline && fileList[0]?.originFileObj) {
      formData.append("file", fileList[0].originFileObj);
    }

    if (editingBook) {
      updateMutation.mutate({ id: editingBook.id, formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  return (
    <Modal
      title={
        editingBook ? t("library.common.editBook") : t("library.common.addBook")
      }
      open={open}
      onCancel={handleClose}
      width={700}
      footer={null}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        onValuesChange={(changedValues) => {
          if ("is_offline" in changedValues) {
            setIsOffline(changedValues.is_offline);
            if (changedValues.is_offline) {
              form.setFieldValue("quantity", null);
              setFileList([]);
            } else {
              form.setFieldValue("quantity", null);
            }
          }
        }}
        initialValues={{
          status: "active",
          is_offline: false,
        }}
      >
        <Item
          name="name_uz"
          label={t("title") + " (UZ)"}
          rules={[
            { required: true, message: t("validation.required") },
            { min: 2, message: t("validation.min_length", { count: 2 }) },
          ]}
        >
          <Input placeholder={t("library.common.enterName")} />
        </Item>
        <Item
          name="name_ru"
          label={t("title") + " (RU)"}
          rules={[
            { required: true, message: t("validation.required") },
            { min: 2, message: t("validation.min_length", { count: 2 }) },
          ]}
        >
          <Input placeholder={t("library.common.enterName")} />
        </Item>

        <Item
          name="description_uz"
          label={t("description") + " (UZ)"}
          rules={[{ required: true, message: t("validation.required") }]}
        >
          <TextArea
            rows={4}
            placeholder={t("library.common.enterDescription")}
          />
        </Item>

        <Item
          name="description_ru"
          label={t("description") + " (RU)"}
          rules={[{ required: true, message: t("validation.required") }]}
        >
          <TextArea
            rows={4}
            placeholder={t("library.common.enterDescription")}
          />
        </Item>

        <div className="grid grid-cols-2 gap-4">
          <Item
            name="for_student"
            label={t("library.common.forStudents")}
            valuePropName="checked"
          >
            <Switch />
          </Item>
          <Item
            name="for_teacher"
            label={t("library.common.forTeachers")}
            valuePropName="checked"
          >
            <Switch />
          </Item>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Item
            name="category"
            label={t("category")}
            rules={[{ required: true, message: t("validation.required") }]}
          >
            <Select
              placeholder={t("library.common.selectCategory")}
              options={categories?.map((cat: any) => ({
                label: i18n.language === "uz" ? cat.name_uz : cat.name_ru,
                value: cat.id,
              }))}
            />
          </Item>

          <Item name="tags" label={t("library.tags")}>
            <Select
              mode="multiple"
              placeholder={t("library.common.selectTags")}
              options={tags?.map((tag: any) => ({
                label: i18n.language === "uz" ? tag.name_uz : tag.name_ru,
                value: tag.id,
              }))}
            />
          </Item>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Item name="status" label={t("status")}>
            <Select
              options={[
                { label: t("statusActive"), value: "active" },
                { label: t("statusInactive"), value: "inactive" },
                { label: t("statusDraft"), value: "draft" },
              ]}
            />
          </Item>

          <Item name="date" label={t("library.common.publishDate")}>
            <Input type="date" />
          </Item>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Item
            name="is_offline"
            label={t("library.common.enterType")}
            valuePropName="checked"
          >
            <Switch
              checkedChildren={t("offline")}
              unCheckedChildren={t("online")}
            />
          </Item>

          <Item
            name="price"
            label={t("price")}
            rules={[{ required: true, message: t("validation.required") }]}
          >
            <InputNumber
              style={{ width: "100%" }}
              addonAfter="so'm"
              placeholder={t("library.common.enterPrice")}
            />
          </Item>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Item label={t("library.common.coverImage")}>
            <Upload
              listType="picture"
              fileList={coverFileList}
              onChange={({ fileList }) => setCoverFileList(fileList)}
              beforeUpload={() => false}
              maxCount={1}
              accept="image/*"
            >
              <Button icon={<UploadOutlined />}>
                {t("library.common.uploadCover")}
              </Button>
            </Upload>
          </Item>

          {isOffline && (
            <Item
              name="quantity"
              label={t("library.common.quantity")}
              rules={[
                { required: true, message: t("validation.required") },
                {
                  type: "number",
                  min: 1,
                  message: t("validation.min_quantity"),
                },
              ]}
            >
              <InputNumber
                style={{ width: "100%" }}
                min={1}
                placeholder={t("library.common.enterQuantity")}
              />
            </Item>
          )}

          {!isOffline && (
            <Item
              label={t("library.common.bookFile")}
              rules={[
                {
                  required: !editingBook && !isOffline,
                  message: t("validation.required"),
                },
              ]}
            >
              <Upload
                fileList={fileList}
                onChange={({ fileList }) => setFileList(fileList)}
                beforeUpload={() => false}
                maxCount={1}
                accept=".pdf,.epub,.mobi"
              >
                <Button icon={<UploadOutlined />}>
                  {t("library.common.uploadFile")}
                </Button>
              </Upload>
            </Item>
          )}
        </div>

        <Item className="mb-0">
          <div className="flex justify-end">
            <Space>
              <Button
                type="primary"
                htmlType="submit"
                loading={createMutation.isPending || updateMutation.isPending}
              >
                {editingBook ? t("update") : t("create")}
              </Button>
              <Button onClick={handleClose}>{t("cancel")}</Button>
            </Space>
          </div>
        </Item>
      </Form>
    </Modal>
  );
};

export default BookFormModal;
