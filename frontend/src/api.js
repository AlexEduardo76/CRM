const API_URL = 'http://localhost:8082/api/clientes';

export async function listarClientes() {
  const res = await fetch(API_URL);
  return res.json();
}

export async function buscarCliente(id) {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
}

export async function criarCliente(cliente) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cliente),
  });
  return res.json();
}

export async function atualizarCliente(id, cliente) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cliente),
  });
  return res.json();
}

export async function excluirCliente(id) {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
}
