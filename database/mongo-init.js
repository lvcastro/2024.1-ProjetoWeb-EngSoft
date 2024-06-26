// Script para inicializar o banco de dados com um superadmin
// Feito para poder testar a aplicação a partir de um "fresh start"
// Executado se e somente se /data/db estiver vazio (no container)
db = db.getSiblingDB("alertaqui");

db.admins.insertOne({
  email: "super@admin.com",
  name: "Super ADM",
  password: "$2a$10$kTtuTNiEHDjKxNOYRXdtLOGebODFX2v66tWMEc/CCcXqn0FXVr3we",
  isSuperadmin: true,
});
