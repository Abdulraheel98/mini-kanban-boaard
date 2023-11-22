// import { GET_TICKETS_BY_STATUS } from "../graphql/query";
import { useMutation } from "@apollo/client";
import { UPDATE_KANBAN_TICKET } from "../graphql/mutation";

// export const useTicketsByStatus = async (status) =>
//   let result;

//   try {
//     const { data, loading, error } = await client.query({
//       query: GET_TICKETS_BY_STATUS,
//       variables: { status },
//       fetchPolicy: "no-cache",
//     });

//     result = {
//       loading,
//       error,
//       tickets: data ? data.ticketsByStatus : [],
//     };
//     return result;
//   } catch (error) {
//     result = {
//       loading: false,
//       error,
//       tickets: [],
//     };
//   }
// };

export const useUpdateKanbanTicketMutation = () => {
  const [updateKanbanTicketMutation] = useMutation(UPDATE_KANBAN_TICKET);

  const updateKanbanTicket = async (id, status) => {
    const result = await updateKanbanTicketMutation({
      variables: {
        id: id,
        status: status,
      },
    });

    return result;
  };
  return { updateKanbanTicket };
};
