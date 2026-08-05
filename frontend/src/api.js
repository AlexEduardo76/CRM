const API_URL = 'http://localhost:8082/api/clientes';

export async function listarClientes() {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error(`Erro ao listar clientes: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export async function buscarCliente(id) {
  const res = await fetch(`${API_URL}/${id}`);

  if (!res.ok) {
    throw new Error(`Erro ao buscar cliente: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export async function criarCliente(cliente) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(cliente)
  });

  if (!res.ok) {
    throw new Error(`Erro ao criar cliente: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export async function atualizarCliente(id, cliente) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(cliente)
  });

  if (!res.ok) {
    throw new Error(`Erro ao atualizar cliente: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export async function excluirCliente(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });

  if (!res.ok) {
    throw new Error(`Erro ao excluir cliente: ${res.status} ${res.statusText}`);
  }
}