import { useEffect, useState } from 'react';
import {
  listarClientes,
  criarCliente,
  atualizarCliente,
  excluirCliente
} from './api.js';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FORM_VAZIO = {
  nome: '',
  email: '',
  telefone: '',
  cidade: ''
};

function formatarTelefone(telefone) {
  if (!telefone) {
    return '';
  }

  const numeros = String(telefone).replace(/\D/g, '');

  if (numeros.length === 11) {
    return `(${numeros.substring(0, 2)}) ${numeros.substring(2, 7)}-${numeros.substring(7, 11)}`;
  }

  if (numeros.length === 10) {
    return `(${numeros.substring(0, 2)}) ${numeros.substring(2, 6)}-${numeros.substring(6, 10)}`;
  }

  return telefone;
}

export default function App() {
  const [clientes, setClientes] = useState([]);
  const [form, setForm] = useState(FORM_VAZIO);
  const [editingId, setEditingId] = useState(null);
  const [emailErro, setEmailErro] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function carregar() {
    try {
      setErro('');
      setCarregando(true);

      const dados = await listarClientes();

      setClientes(Array.isArray(dados) ? dados : []);
    } catch (error) {
      console.error('Erro ao carregar clientes:', error);
      setErro('Não foi possível carregar os clientes.');
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  // CORRIGIDO:
  // Agora o formulário recebe os dados do cliente selecionado.
  function handleEditar(cliente) {
    setEditingId(cliente.id);

    setForm({
      nome: cliente.nome || '',
      email: cliente.email || '',
      telefone: cliente.telefone || '',
      cidade: cliente.cidade || ''
    });

    setEmailErro('');
    setErro('');
  }

  function handleCancelarEdicao() {
    setEditingId(null);
    setForm({ ...FORM_VAZIO });
    setEmailErro('');
    setErro('');
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'email') {
      setEmailErro('');
    }

    setErro('');
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const nome = form.nome.trim();
    const email = form.email.trim();
    const telefone = form.telefone.trim();
    const cidade = form.cidade.trim();

    if (!nome) {
      setErro('Informe o nome do cliente.');
      return;
    }

    if (!EMAIL_REGEX.test(email)) {
      setEmailErro('E-mail inválido.');
      return;
    }

    if (!telefone) {
      setErro('Informe o telefone.');
      return;
    }

    if (!cidade) {
      setErro('Informe a cidade.');
      return;
    }

    try {
      setErro('');
      setEmailErro('');

      const dadosCliente = {
        nome,
        email,
        telefone,
        cidade
      };

      if (editingId !== null) {
        await atualizarCliente(editingId, dadosCliente);
      } else {
        await criarCliente(dadosCliente);
      }

      setForm({ ...FORM_VAZIO });
      setEditingId(null);

      await carregar();
    } catch (error) {
      console.error('Erro ao salvar cliente:', error);
      setErro('Não foi possível salvar o cliente.');
    }
  }

  async function handleExcluir(id) {
    const confirmar = window.confirm(
      'Tem certeza que deseja excluir este cliente?'
    );

    if (!confirmar) {
      return;
    }

    try {
      setErro('');

      await excluirCliente(id);

      if (editingId === id) {
        setEditingId(null);
        setForm({ ...FORM_VAZIO });
      }

      await carregar();
    } catch (error) {
      console.error('Erro ao excluir cliente:', error);
      setErro('Não foi possível excluir o cliente.');
    }
  }

  return (
    <div className="app">

      <header>
        <h1>Cadastro de Clientes</h1>
        <p>CRM simples para gestão de contatos</p>
      </header>

      <main>

        <section className="form-section">

          <h2>
            {editingId !== null
              ? 'Editar cliente'
              : 'Novo cliente'}
          </h2>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              name="nome"
              placeholder="Nome"
              value={form.nome}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="E-mail"
              value={form.email}
              onChange={handleChange}
              required
            />

            <input
              type="tel"
              name="telefone"
              placeholder="Telefone"
              value={form.telefone}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="cidade"
              placeholder="Cidade"
              value={form.cidade}
              onChange={handleChange}
              required
            />

            <button type="submit">
              {editingId !== null
                ? 'Salvar alterações'
                : 'Adicionar'}
            </button>

            {editingId !== null && (
              <button
                type="button"
                onClick={handleCancelarEdicao}
              >
                Cancelar
              </button>
            )}

          </form>

          {emailErro && (
            <p className="erro">
              {emailErro}
            </p>
          )}

          {erro && (
            <p className="erro">
              {erro}
            </p>
          )}

        </section>

        <section className="table-section">

          <h2>Clientes cadastrados</h2>

          {carregando ? (
            <p>Carregando clientes...</p>
          ) : clientes.length === 0 ? (
            <p>Nenhum cliente cadastrado.</p>
          ) : (

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

                {clientes.map(cliente => (

                  <tr key={cliente.id}>

                    <td>
                      {cliente.nome}
                    </td>

                    <td>
                      {cliente.email}
                    </td>

                    <td>
                      {formatarTelefone(cliente.telefone)}
                    </td>

                    <td>
                      {cliente.cidade}
                    </td>

                    <td>

                      <button
                        type="button"
                        className="action editar"
                        onClick={() => handleEditar(cliente)}
                      >
                        Editar
                      </button>

                      <button
                        type="button"
                        className="action excluir"
                        onClick={() => handleExcluir(cliente.id)}
                      >
                        Excluir
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          )}

        </section>

      </main>

    </div>
  );
}
