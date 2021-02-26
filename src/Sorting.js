import React, { useState } from "react";

/*
[  <-- sorted by full name asc
  {
    // top row (expandible row attributes)
    fullName: 'Smith, John',  <- most recent?
    tokenId: tokenId,
    lastStatus: APPROVED,
    expanded: false,
    children: [   <-- sorted by date
      { .. },
      { .. },
    ]
  },
  ...
]
*/

const accounts = [
  { firstName: "Adam", lastName: "Smoth", tokenId: "4127e3e6-e1e3-4de5-8273-7ed72fc4cd2f", created: "2021-02-19T01:58:59.525Z", workflowStatus: " ACCTREQ-DENIED" },
  { firstName: "John", lastName: "Smith", tokenId: "4127e3e6-e1e3-4de5-8273-7ed72fc4cd2f", created: "2021-02-20T01:30:00.034Z", workflowStatus: " ACCTREQ-APPROVED" },
  { firstName: "John", lastName: "Smith", tokenId: "4127e3e6-e1e3-4de5-8273-7ed72fc4cd2f", created: "2021-02-19T23:00:33.034Z", workflowStatus: " ACCTREQ-TEST" },
  // { firstName: "Mike", lastName: "Nugen", tokenId: "560459ea-b47a-4801-97b4-cc3500c6680a", created: "2021-02-19T01:37:36.910Z", workflowStatus: " ACCTREQ-APPROVED" },
];

const columns = [
  { dataKey: "name", title: "Name" },
  { dataKey: "created", title: "Submitted" },
  { dataKey: "tokenId", title: "tokenId" },
  { dataKey: "workflowStatus", title: "Status" }
];

function sortByFullName(items) {
  // console.table(items);

  // temp array to hold objects with index and full name
  const fullNames = items.map((item, i) => {
    return { index: i, fullName: (item.lastName + ", " + item.firstName) };
  });
  // console.table(fullNames);

  // sorts the temp array containing the full names
  fullNames.sort(function (a, b) {
    return a.fullName.localeCompare(b.fullName);
  });

  const sorted = fullNames.map((el) => {
    let item = items[el.index];
    item['fullName'] = el.fullName;
    return item;
  });
  console.table(sorted);

  return sorted;
}

function sortMap() {
  // the array to be sorted
  var list = ['CHARLIE', 'alpha', 'Bravo'];

  // temporary array holds objects with position and sort-value
  var mapped = list.map(function (el, i) {
    return { index: i, value: el.toLowerCase() };
  })
  console.table(mapped);
  // 0: {index: 0, value: "charlie"}
  // 1: {index: 1, value: "alpha"}
  // 2: {index: 2, value: "bravo"}


  // sorting the mapped array containing the reduced values
  mapped.sort(function (a, b) {
    if (a.value > b.value) {
      return 1;
    }
    if (a.value < b.value) {
      return -1;
    }
    return 0;
  });
  // 0: {index: 1, value: "alpha"}
  // 1: {index: 2, value: "bravo"}
  // 3: {index: 0, value: "charlie"}

  // container for the resulting order
  var result = mapped.map(function (el) {
    return list[el.index];
  });
  console.table(result);

}

function groupByTokenId(items) {
  const results = {};
  for (const item of items) {
    const { tokenId } = item;
    // console.log('results[tokenId]', results[tokenId]);
    if (results[tokenId] === undefined) {
      results[tokenId] = [];
    }
    results[tokenId].push(item);
  }

  return results;
}

function latestRecord(items, propName) {
  console.table(items, ["fullName", propName]);
  console.log('propName', propName);
  const latest = items.sort( (a, b) => {
    return (a.created < b.created) ? -1 : (a.created > b.created ? 1 : 0); 
  });
  console.log('latest', latest);

  console.log('latest[propName]', latest[propName]);

  return latest[propName];
}


function buildModel(groupedItems) {
  let parents = [];
  Object.keys(groupedItems).forEach(itemKey => {
    let children = groupedItems[itemKey];
    let data = {
      expanded: false,  // collapsed
      fullName: latestRecord(children, columns[1].dataKey),
      lastStatus: "",
      tokenId: itemKey,
      children: children, 
    };
    parents.push(data);
  });
  // console.table(parents);
  return parents;
}


function Sorting() {
  console.log('render');
  const [score, setScore] = useState({ p1: 0, p2: 10 });
  // console.log('score', score);
  const increase = () => {
    console.log('clicked');
    let temp = { ...score };
    temp['p1'] = temp['p1'] + 1;
    setScore(temp);
  }

  const sortedData = sortByFullName(accounts);
  const groupedData = groupByTokenId(sortedData);
  const model = buildModel(groupedData);
  // console.table(model);

  return (
    <div>
      <button onClick={increase}>Up</button>
      <ul>
        {Object.keys(score).map((itemKey, index) => (
          <li>{itemKey} : {score[itemKey]}</li>
        ))}
      </ul>
      {/* <p>Score is {score} for {name}</p> */}
    </div>
  );
}

export default Sorting;
