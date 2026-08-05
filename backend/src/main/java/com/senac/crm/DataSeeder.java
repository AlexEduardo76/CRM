package com.senac.crm;

import com.senac.crm.model.Cliente;
import com.senac.crm.repository.ClienteRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    private final ClienteRepository repository;

    public DataSeeder(ClienteRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... args) {
        if (repository.count() > 0) return;

        repository.save(new Cliente(null, "Mariana Souza", "mariana.souza@gmail.com", "61999998888", "Brasília", null));
        repository.save(new Cliente(null, "João Pedro Lima", "joaopedro@hotmail.com", "(61) 98888-7777", "Brasília", null));
        repository.save(new Cliente(null, "Fernanda Alves", "fernanda.alves@yahoo.com", "6197776666", "Águas Claras", null));
        repository.save(new Cliente(null, "Ricardo Torres", "ricardo.torres@gmail.com", "(61) 3333-4444", "Taguatinga", null));
        repository.save(new Cliente(null, "Beatriz Nunes", "bia.nunes@outlook.com", "61995554444", "Brasília", null));
        repository.save(new Cliente(null, "Gustavo Ramos", "gustavo.ramos@gmail.com", "(61) 99222-1111", "Ceilândia", null));
        repository.save(new Cliente(null, "Larissa Costa", "larissa.costa@gmail.com", "61988887777", "Brasília", null));
        repository.save(new Cliente(null, "Paulo Henrique", "paulo.h@empresa.com.br", "(61) 3555-1234", "Gama", null));
    }
}
