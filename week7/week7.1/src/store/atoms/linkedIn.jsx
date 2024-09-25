import { atom, atomFamily, selector, selectorFamily } from "recoil";
import axios from "axios";
import { TODOS } from "../../TODOS";

export const notifications = atom({
  key: "notifications",
  //   default: {
  //     network: 4,
  //     jobs: 6,
  //     messaging: 10,
  //     notifications: 20,
  //   },
  // what if these values are to be fetched from the backend? async queries
  default: selector({
    key: "fetchNoficationsCountSelector",
    get: async () => {
      const res = await axios.get(
        "https://sum-server.100xdevs.com/notifications"
      );
      return res.data;
    },
  }),
});

export const totalNotifiSelector = selector({
  key: "totalNotifiSelector",
  get: ({ get }) => {
    const allNotifis = get(notifications);
    return (
      allNotifis.network +
      allNotifis.jobs +
      allNotifis.messaging +
      allNotifis.notifications
    );
  },
});

// todos: atom family
// atom family return a function, which upon calling, returns an atom
// why not just use atom and set default to an array of todos?
// in that case, everytime there is any change in one todo, all the other todos re-render
// therefore, it is good that each todo has its own atom

/* 
export const todosAtomFamily = atomFamily({
  key: "todosAtomFamily",
  default: (id) => TODOS.find((x) => x.id === id),
});
*/

// use selectorFamily for making async backend calls in default
export const todosAtomFamily = atomFamily({
  key: "todosAtomFamily",
  default: selectorFamily({
    key: "todosSelectorFamily",
    get: (id) => {
      return async () => {
        const res = await axios.get(
          `https://sum-server.100xdevs.com/todo?id=${id}`
        );
        return res.data.todo;
      };
    },
  }),
});
