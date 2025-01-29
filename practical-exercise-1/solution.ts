namespace Solution2 {
  /** Primer mejora ⭐: Creación de enums para mejorar tipado, legibilidad y mantenibilidad (DRY) */
  enum Role {
    Admin = "admin",
    Editor = "editor",
    Reader = "lector",
  }

  enum Permission {
    Edit = "edit",
    Read = "read",
  }

  enum Resource {
    Document1 = "document1",
    Document2 = "document2",
    Document3 = "document3",
  }

  class User {
    private name: string;
    private role: Role;

    constructor(name: string, role: Role) {
      this.name = name;
      this.role = role;
    }

    /*  Segunda mejora ⭐: Método que encapsula la lógica de la existencia del permiso en la clase del usuario (TDA aplicado) */
    public hasPermission(permission: Permission): boolean {
      if (this.role === Role.Admin) {
        return true;
      } else if (this.role === Role.Editor && permission === Permission.Edit) {
        return true;
      } else if (this.role === Role.Reader && permission === Permission.Read) {
        return true;
      }

      return false;
    }

    /*  Tercer mejora ⭐: Se encapsula la clase, ahora las clases externas no pueden modificar su estado */
    public getRole(): Role {
      return this.role;
    }
  }

  class ResourcesManger {
    // Simulación de una base de datos que almacena los recursos y los roles que pueden acceder
    private allowedResources: { [key in Resource]: Role[] } = {
      [Resource.Document1]: [Role.Admin, Role.Editor],
      [Resource.Document2]: [Role.Admin, Role.Reader],
      [Resource.Document3]: [Role.Admin],
    };

    public checkAccess(
      user: User,
      permission: Permission,
      resource: Resource
    ): boolean {
      /*  Cuarta mejora ⭐: Desacoplamiento (TDA), la clase ResourcesManger no conoce el estado de la clase User 
        y delega la responsabilidad de verificar la existencia de permisos a la clase User */
      if (!user.hasPermission(permission)) {
        return false;
      }

      /*  Quinta mejora ⭐: Se reduce la extensión del código (DRY), antes por cada rol se ejecutaban las mismas lineas
      de código */
       /*  Sexta mejora ⭐: Se cambia el nombre de la variable para que sea mas claro, esto facilita el mantenimiento del código */
      const resourceAllowedRoles = this.getResourceAllowedRoles(resource);
      if (!resourceAllowedRoles.includes(user.getRole())) {
        return false;
      }

      return true;
    }

    private getResourceAllowedRoles(resource: Resource): Role[] {
      return this.allowedResources[resource] || [];
    }
  }
}
