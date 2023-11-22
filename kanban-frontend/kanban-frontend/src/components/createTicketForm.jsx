import { useFormik } from "formik";
import validationSchema from "./validationSchema";
import Modal from "react-modal";
import { format, parseISO } from "date-fns";
import { CreateTicketFormProp } from "./prop_validation/createTicketFormPropValidation";

Modal.setAppElement("#root");

const CreateTicketForm = ({ isOpen, onClose, onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      assignedTo: "",
      date: format(new Date(), "yyyy-MM-dd"),
    },

    validationSchema: validationSchema,
    onSubmit: async (values) => {
      onSubmit(values);
      onClose();
    },
  });
  const handleAfterClose = () => {
    formik.resetForm();
  };

  const formFields = [
    { name: "title", label: "Title", type: "text", placeholder: "Enter title" },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Enter the Description",
    },
    {
      name: "assignedTo",
      label: "Assigned To",
      type: "text",
      placeholder: "Enter assigned to",
    },
    {
      name: "date",
      label: "date",
      type: "date",
      placeholder: "Select due date",
    },
  ];
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      onAfterClose={handleAfterClose}
      contentLabel="Create Ticket Form"
      className="modal fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-200 rounded-md shadow-lg opacity-100"
      overlayClassName="overlay fixed inset-0 bg-black opacity-92"
    >
      <div className="flex items-center justify-center h-full">
        <div className="bg-gray-200 p-8 rounded-md w-full md:w-96">
          <button
            className="absolute top-4 right-4 text-gray-800 font-bold"
            onClick={onClose}
          >
            X
          </button>
          <form onSubmit={formik.handleSubmit}>
            {formFields.map((field) => (
              <div key={field.name} className="mb-4">
                <label htmlFor={field.name} className="font-bold">
                  {field.label}
                </label>
                {field.type === "textarea" ? (
                  <textarea
                    id={field.name}
                    name={field.name}
                    onChange={formik.handleChange}
                    value={formik.values[field.name]}
                    placeholder={field.placeholder}
                    className="w-full border rounded-md p-2"
                    style={{ opacity: 1 }}
                  />
                ) : (
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    onChange={formik.handleChange}
                    value={
                      field.type === "date"
                        ? format(
                            parseISO(formik.values[field.name]),
                            "yyyy-MM-dd"
                          )
                        : formik.values[field.name]
                    }
                    placeholder={field.placeholder}
                    disabled={field.type === "date"}
                    className="w-full border rounded-md p-2"
                    style={{ opacity: 1 }}
                  />
                )}
                {formik.errors[field.name] && (
                  <div className="text-red-500">
                    {formik.errors[field.name]}
                  </div>
                )}
              </div>
            ))}
            <button
              type="submit"
              className="bg-gray-700 text-white rounded-full px-4 py-2 w-full md:w-auto"
            >
              Create Ticket
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

CreateTicketForm.propTypes = CreateTicketFormProp;

export default CreateTicketForm;
