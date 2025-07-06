import * as yup from "yup";

export const messageSchema = yup.object({
  message: yup
    .string()
    .min(4, "Message must be at least 4 characters long")
    .required("Message is required"),
});
