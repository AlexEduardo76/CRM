import { useEffect, useState } from 'react';
import { listarClientes, criarCliente, atualizarCliente, excluirCliente } from './api.js';

const EMAIL_REGEX = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2}$/;

function formatarTelefone(telefone) {
  // Assume sempre 11 dígitos "puros" (DDD + 9 dígitos)
  return '(' + telefone.substring(0, 2) + ') ' + telefone.substring(2, 7) + '-' + telefone.substring(7, 11);
}

const FORM_VAZIO = { nome: '', email: '', telefone: '', cidade: '' };

export default function App() {
  const [clientes, setClientes] = useState([]);
  const [form, setForm] = useState(FORM_VAZIO);
  const [editingId, setEditingId] = useState(null);
  const [emailErro, setEmailErro] = useState('');

  async function carregar() {
    const dados = await listarClientes();
    setClientes(dados);
  }

  useEffect(() => { carregar(); }, []);

  function handleEditar(cliente) {
    // (bug: o formulário não é preenchido com os dados do cliente selecionado)
    setEditingId(cliente.id);
  }

  function handleCancelarEdicao() {
    setEditingId(null);
    setForm(FORM_VAZIO);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!EMAIL_REGEX.test(form.email)) {
      setEmailErro('E-mail inválido.');
      return;
    }
    setEmailErro('');

    if (editingId) {
      await atualizarCliente(editingId, form);
    } else {
      await criarCliente(form);
    }

    setForm(FORM_VAZIO);
    setEditingId(null);
    carregar();
  }

  async function handleExcluir(id) {
    if (!confirm('Excluir este cliente?')) return;
    await excluirCliente(id);
    carregar();
  }

  return (
    <div className="app">
      <header>
        <h1>👥 Cadastro de Clientes</h1>
        <p>CRM simples para gestão de contatos</p>
      </header>

      <main>
        <section className="form-section">
          <h2>{editingId ? 'Editar cliente' : 'Novo cliente'}</h2>
          <form onSubmit={handleSubmit}>
            <input
              placeholder="Nome"
              value={form.nome}
              onChange={e => setForm({ ...form, nome: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="E-mail"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              required
            />
            <input
              placeholder="Telefone"
              value={form.telefone}
              onChange={e => setForm({ ...form, telefone: e.target.value })}
              required
            />
            <input
              placeholder="Cidade"
              value={form.cidade}
              onChange={e => setForm({ ...form, cidade: e.target.value })}
              required
            />
            <button type="submit">{editingId ? 'Salvar' : 'Adicionar'}</button>
            {editingId && (
              <button type="button" onClick={handleCancelarEdicao}>Cancelar</button>
            )}
          </form>
          {emailErro && <p className="erro">{emailErro}</p>}
        </section>

        <section className="table-section">
          <h2>Clientes cadastrados</h2>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Telefone</th>
                <th>Cidade</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map(c => (
                <tr key={c.id}>
                  <td>{c.nome}</td>
                  <td>{c.email}</td>
                  <td>{formatarTelefone(c.telefone)}</td>
                  <td>{c.cidade}</td>
                  <td>
                    <button className="action editar" onClick={() => handleEditar(c)}>Editar</button>
                    <button className="action excluir" onClick={() => handleExcluir(c.id)}>Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
