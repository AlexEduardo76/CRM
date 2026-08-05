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

        if (repository.count() > 0) {
            return;
        }

        Cliente cliente1 = new Cliente();
        cliente1.setNome("Mariana Souza");
        cliente1.setEmail("mariana.souza@gmail.com");
        cliente1.setTelefone("61999998888");
        cliente1.setCidade("Brasília");
        repository.save(cliente1);

        Cliente cliente2 = new Cliente();
        cliente2.setNome("João Pedro Lima");
        cliente2.setEmail("joaopedro@hotmail.com");
        cliente2.setTelefone("(61) 98888-7777");
        cliente2.setCidade("Brasília");
        repository.save(cliente2);

        Cliente cliente3 = new Cliente();
        cliente3.setNome("Fernanda Alves");
        cliente3.setEmail("fernanda.alves@yahoo.com");
        cliente3.setTelefone("6197776666");
        cliente3.setCidade("Águas Claras");
        repository.save(cliente3);

        Cliente cliente4 = new Cliente();
        cliente4.setNome("Ricardo Torres");
        cliente4.setEmail("ricardo.torres@gmail.com");
        cliente4.setTelefone("(61) 3333-4444");
        cliente4.setCidade("Taguatinga");
        repository.save(cliente4);

        Cliente cliente5 = new Cliente();
        cliente5.setNome("Beatriz Nunes");
        cliente5.setEmail("bia.nunes@outlook.com");
        cliente5.setTelefone("61995554444");
        cliente5.setCidade("Brasília");
        repository.save(cliente5);

        Cliente cliente6 = new Cliente();
        cliente6.setNome("Gustavo Ramos");
        cliente6.setEmail("gustavo.ramos@gmail.com");
        cliente6.setTelefone("(61) 99222-1111");
        cliente6.setCidade("Ceilândia");
        repository.save(cliente6);

        Cliente cliente7 = new Cliente();
        cliente7.setNome("Larissa Costa");
        cliente7.setEmail("larissa.costa@gmail.com");
        cliente7.setTelefone("61988887777");
        cliente7.setCidade("Brasília");
        repository.save(cliente7);

        Cliente cliente8 = new Cliente();
        cliente8.setNome("Paulo Henrique");
        cliente8.setEmail("paulo.h@empresa.com.br");
        cliente8.setTelefone("(61) 3555-1234");
        cliente8.setCidade("Gama");
        repository.save(cliente8);
    }
}