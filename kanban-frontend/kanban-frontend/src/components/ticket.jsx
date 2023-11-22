import { format } from "date-fns";
import { useDrag } from "react-dnd";
import PropTypes from "prop-types";
import { ticketShape } from "./prop_validation/ticketPropValidation";

const Ticket = ({ ticket, index }) => {
  const isDone = ticket.status === "done";

  const [{ isDragging }, drag] = useDrag({
    type: "CARD",
    item: { id: ticket.id, index },
    isDragDisabled: isDone,
    canDrag: !isDone,
  });

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.3 : 1 }}>
      <div
        className={`bg-gray-100 w-60 p-3 rounded-lg shadow-md mx-auto my-4 ${
          isDone ? "opacity-40" : ""
        }`}
      >
        <div className="flex items-start justify-between mb-1">
          <p
            className={`text-xs text-gray-600 pr-2 ${
              isDone ? "line-through" : ""
            }`}
          >
            {ticket.date}
          </p>
          <p
            className={`text-lg font-bold text-center ${
              isDone ? "line-through" : ""
            }`}
          >
            {ticket.title}
          </p>
        </div>
        <hr className="my-2 border-t border-gray-300 " />
        <div className="mb-2 flex flex-col">
          <p
            className={`text-sm font-bold mb-1 flex justify-center ${
              isDone ? "line-through" : ""
            }`}
          >
            Description
          </p>
          <p
            className={`border border-gray-300  rounded p-2 text-xs break-all relative block mb-1  ${
              isDone ? "line-through" : ""
            }`}
            style={{ minHeight: "70px" }}
          >
            {ticket.description.length > 100
              ? ticket.description.substring(0, 100) + ".."
              : ticket.description}
          </p>
        </div>

        <div className="flex justify-between">
          <p
            className={`text-xs text-gray-600 border-b border-gray-300 pb-1 ${
              isDone ? "line-through" : ""
            }`}
          >
            {`#${ticket.id.substring(0, 8)}`}
          </p>
          <p
            className={`text-xs text-gray-600 border-b border-gray-300 pb-1 ${
              isDone ? "line-through" : ""
            }`}
          >
            {ticket.assignedTo}
          </p>
        </div>
      </div>
    </div>
  );
};

Ticket.propTypes = {
  ticket: PropTypes.shape(ticketShape).isRequired,
  index: PropTypes.number.isRequired,
};

Ticket.defaultProps = {
  date: format(new Date(), "yyyy-MM-dd"),
};

export default Ticket;
