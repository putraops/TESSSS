import axios from "axios";

async function login() {
  const res = await axios({
    method: "post",
    url: "https://builder.fiyge.com/access_controls/users/login.json?data[users][user_name]=admin@builder.fiyge.com&data[users][user_password]=admin@builder.fiyge.com",
  });
  return res.data.access_token;
}

async function search(root, parent, token) {
  const query = encodeURIComponent(
    JSON.stringify({
      order: ["forms.sequence  ASC"],
      where: [{ "forms.parent_id": parent }],
      active_level: 1,
    })
  );
  // Get all children
  const res = await axios({
    method: "get",
    url: `https://builder.fiyge.com/development_base/forms/index.json?q=${query}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  for (const c of res.data.paginate.data) {
    // Use classic for each loop because forEach is not good with async and await functions
    let newC = JSON.parse(JSON.stringify(c));
    newC["forms.properties"] = JSON.parse(newC["forms.properties"]);
    newC["children"] = {};
    root[parent]["children"][newC["forms.id"]] = newC;
    if (newC.is_leaf_node === "0") {
      await search(root[parent]["children"], newC["forms.id"], token);
    }
  }
}

export async function getTree(start) {
  let tree = {};

  const token = await login();

  const query = encodeURIComponent(
    JSON.stringify({
      order: ["forms.sequence  ASC"],
      where: [{ "forms.id": start }],
      active_level: 1,
    })
  );

  const res = await axios({
    method: "get",
    url: `https://builder.fiyge.com/development_base/forms/index.json?q=${query}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  let root = JSON.parse(JSON.stringify(res.data.paginate.data[0]));
  root["forms.properties"] = JSON.parse(root["forms.properties"]);
  root["children"] = {};
  tree[root["forms.id"]] = root;

  await search(tree, start, token);
  return tree;
}

// getTree("52611ec1-cec4-42f1-b88e-1d890acef1b9").then((res) => {
//   console.log(res);
// });
