import { registerEnumType } from "@nestjs/graphql";

enum Status {
  COMPLETE = "COMPLETE",
  IN_WORK = "IN_WORK",
  AWAITING = "AWAITING",
}

registerEnumType(Status, {
  name: "Status",
});

export default Status;
