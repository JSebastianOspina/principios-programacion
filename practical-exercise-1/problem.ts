class User {
  public name: string;
  public role: string;

  constructor(name: string, role: string) {
    this.name = name;
    this.role = role;
  }
}

class ResourcesManger {
  // Simulación de una base de datos que almacena los recursos y los roles que pueden acceder
  private allowedResources: { [resource: string]: string[] } = {
    document1: ["admin", "editor"],
    document2: ["admin", "reader"],
    document3: ["admin"],
  };

  // Nota: El permiso está asociado al rol del usuario; el rol admin tiene todos los permisos
  public checkAccess(
    user: User,
    permission: string,
    resource: string
  ): boolean {
    if (user.role === "admin") {
      const allowedRoles = this.getAllowedRoles(resource);
      return allowedRoles.includes(user.role);
    } else if (user.role === "editor" && permission === "edit") {
      const allowedRoles = this.getAllowedRoles(resource);
      return allowedRoles.includes(user.role);
    } else if (user.role === "reader" && permission === "read") {
      const allowedRoles = this.getAllowedRoles(resource);
      return allowedRoles.includes(user.role);
    }

    return false;
  }

  private getAllowedRoles(resource: string): string[] {
    return this.allowedResources[resource] || [];
  }
}
