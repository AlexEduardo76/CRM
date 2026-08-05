package com.senac.crm.controller;

import com.senac.crm.model.Cliente;
import com.senac.crm.repository.ClienteRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clientes")
public class ClienteController {

    private final ClienteRepository repository;

    public ClienteController(ClienteRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Cliente> listar() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Cliente buscar(@PathVariable Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
    }

    @PostMapping
    public Cliente criar(@RequestBody Cliente cliente) {
        return repository.save(cliente);
    }

    @PutMapping("/{id}")
    public Cliente atualizar(@PathVariable Long id, @RequestBody Cliente dados) {
        Cliente cliente = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
        cliente.setNome(dados.getNome());
        cliente.setEmail(dados.getEmail());
        cliente.setTelefone(dados.getTelefone());
        cliente.setCidade(dados.getCidade());
        return repository.save(cliente);
    }

    @DeleteMapping("/{id}")
    public void remover(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
