function stackItemInstances(allItems: any[]) {
  const stackedItems: any[] = [];
  allItems.forEach(item => {
    const alreadyIncludedItem = stackedItems.find(stackedItem => item.itemID === stackedItem.itemID);

    if (alreadyIncludedItem) {
      alreadyIncludedItem.count++;
    } else {
      item.count = 1;
      stackedItems.push(item);
    }
  });

  return stackedItems;
}

export { stackItemInstances };