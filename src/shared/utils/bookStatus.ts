export enum BookStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  DRAFT = "draft",
  ARCHIVED = "archived",
}

export const getStatusConfig = (status: string) => {
  const configs = {
    [BookStatus.ACTIVE]: { color: "green", label: "statusActive" },
    [BookStatus.INACTIVE]: { color: "red", label: "statusInactive" },
    [BookStatus.DRAFT]: { color: "orange", label: "statusDraft" },
    [BookStatus.ARCHIVED]: { color: "gray", label: "statusArchived" },
  };

  return configs[status as BookStatus] || { color: "default", label: status };
};
