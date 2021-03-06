import React, { useState, useEffect } from 'react';
import { request } from 'umi';

async function testRequest({ showType }) {
  await request(`/api/users/failure?showType=${showType}`);
}

async function testOPPostRequest() {
  await request('/api.json', {
    method: "POST",
    data: {
      "action": "sofa.mq.middleware.instance.get",
      "product": "mq",
      "version": "2.0",
      "params": { "curr_tenant": "ORGJC1CN", "curr_workspace": "luvwyllaTest" }
    }
  });
}

export default () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const { data: users } = await request(`/api/users`);
      await testOPPostRequest();
      setUsers(users);
    })();
  }, []);

  return (<>
    <h1>@umijs/plugin-request</h1>
    <h2>Users</h2>
    <ul>
      { users.map(u => <li key={u}>{u}</li>) }
    </ul>
    <h2>Test Request</h2>
    <ul>
      <li><button onClick={testRequest.bind(null, { showType: 0 })}>showType 0</button></li>
      <li><button onClick={testRequest.bind(null, { showType: 1 })}>showType 1</button></li>
      <li><button onClick={testRequest.bind(null, { showType: 4 })}>showType 4</button></li>
      <li><button onClick={testRequest.bind(null, { showType: 9 })}>showType 9</button></li>
    </ul>
  </>);
}
