import { UserEvent, userEvent } from "@testing-library/user-event";
import { beforeEach } from "vitest";

export let user: UserEvent = null!;

beforeEach(() => {
  user = userEvent.setup();
});
