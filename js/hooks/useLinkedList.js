export const useLinkedList = (items) => {
  if (!items || items.length === 0) {
    throw new Error('Items array must be provided and non-empty');
  }

  const state = {
    current: null,
    head: null,
    tail: null,
  };

  const createNodesFromItems = () =>
    items.map((item) => ({
      data: item,
      next: null,
      prev: null,
    }));

  const connectedNodesCircular = (nodes) => {
    nodes.forEach((node, index) => {
      if (index === 0) {
        state.head = node;
        return;
      }

      const prevNode = nodes[index - 1];
      prevNode.next = node;
      node.prev = prevNode;

      if (index === nodes.length - 1) {
        state.tail = node;
        state.tail.next = state.head;
        state.head.prev = state.tail;
      }
    });
  };

  const initialize = () => {
    const nodes = createNodesFromItems();
    connectedNodesCircular(nodes);
    state.current = state.head;
  };

  initialize();

  // Public API
  const next = () => {
    state.current = state.current.next;
    return state.current.data;
  };

  const prev = () => {
    state.current = state.current.prev;
    return state.current.data;
  };

  const current = () => state.current.data;

  const reset = () => (state.current = state.head);

  return {
    next,
    prev,
    current,
    reset,
  };
};
