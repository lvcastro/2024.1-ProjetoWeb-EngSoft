# Alertaqui - Projeto Web / EngSoft 2024.1

Projeto elaborado nas disciplinas de Introdução ao Desenvolvimento Web e Engenharia de Software do ICMC (USP São Carlos) no período de 2024.1.

## Membros da equipe

- Antônio Pedro Amado de Menezes Medrado
- Diego Cabral Morales
- Henrico Lazuroz Moura de Almeida
- Jean Michel Furtado M'Peko
- Lucas Vizzotto de Castro
- Murilo Valentim Zabott
- Pedro Liduino do Nascimento

## Descrição

Este projeto foi desenvolvido para os habitantes de São Carlos reportarem problemas de trânsito na cidade. As denúncias enviadas seriam gerenciadas por uma emissora de TV local, que pode utilizar essas informações para melhorar a cobertura e noticiar problemas de trânsito que persistem há muito tempo.

## Instruções de uso

### Pré-requisitos

Certifique-se de ter o Docker instalado, em versão com Docker Compose V2 (versões posteriores a 2020).

### Passo a passo

1. **Clonar o repositório:**

   ```sh
   git clone https://github.com/lvcastro/2024.1-ProjetoWeb-EngSoft.git
   cd ./2024.1-ProjetoWeb-EngSoft
   ```

2. **Fazer build das imagens e iniciar os containers do Docker:**

   ```sh
   sudo docker compose up --build -d
   ```

3. **Acessar `http://localhost:8080`**

4. **Ao finalizar o uso, pare e remova os containers:**

   ```sh
   sudo docker compose down
   ```

### Rotas

As seguintes rotas não possuem links na barra de navegação (pois não são áreas feitas para o usuário comum) e devem ser acessadas diretamente.

- **Login:** `http://localhost:8080/login`
- **Gerenciar denúncias:** `http://localhost:8080/reports`
- **Gerenciar admins:** `http://localhost:8080/admin`

### Administradores registrados

Para que seja possível testar o sistema, ao iniciar os containers pela primeira vez, a coleção de admins será populada com uma entrada de _Super admin_:

- e-mail: `super@admin.com`
- senha: `123`
