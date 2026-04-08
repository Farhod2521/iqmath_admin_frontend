export enum UserStatus {
  ACTIVE_STAFF = "active_staff",
  INACTIVE_STAFF = "inactive_staff",
  CITIZEN = "citizen",
}

export enum RoleLabel {
  Student = "O'quvchi",
  teacher = "Mentor",
  parent = "Ota-ona",
  tutor = "O'qituvchi",
}

export const AwardTypeLabel: Record<string, string> = {
  coin: "Tanga",
  score: "Ball",
};

export enum QuestionType {
  STAFF = "staff",
  CITIZENS = "citizens",
  EVERYONE = "everyone",
  MANAGEMENT = "management",
  TECHNICAL = "technical",
}

export enum ConclusionType {
  WAITING = "WAITING", // kutilmoqda
  FORWARD = "FORWARD", // keyingi qadamga o'tkazish
  BACKWARD = "BACKWARD", // ortga qaytarish
  REJECT = "REJECT", // rad etish
  // -- parallelda
  CONFIRM = "CONFIRM", // parallelda ijobiy
  DENY = "DENY", // parallelda salbiy
}

export enum TrendType {
  SAME = "same",
  UP = "up",
  DOWN = "down",
  NEW = "new",
}

export const UZKAD_ACTION_TYPES = new Set<string>([
  "SEND_TO_UZKAD_WINNER_REGISTRATION",
  "SEND_TO_UZKAD_PASSPORT",
  "SEND_TO_UZKAD_RE_REGISTRATION",
  "SEND_TO_UZKAD_CHECK",
  "SEND_TO_UZKAD_REGISTRATION",
  "SEND_TO_UZKAD_RE_REGISTRATION_PART",
  "SEND_CHILD_TO_UZKAD_CHECK",
  "CREATE_MAIN_PROPERTY_AS_LOT_UZKAD",
  "DIVIDE_PARENT_PROPERTY_UZKAD",
]);

export const AUCTION_ACTION_TYPES = new Set<string>([
  "SEND_TO_AUCTION_CHECK",
  // keyin yana qo‘shilsa shu yerga
]);
