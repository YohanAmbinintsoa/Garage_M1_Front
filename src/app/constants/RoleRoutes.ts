interface RoleRoutes {
    admin: { name?: string, icon?: string, route?: string }[];
    mecano: { name?: string, icon?: string, route?: string }[]; 
    user: { name?: string, icon?: string, route?: string }[];
}
  
  export const roleRoutes: RoleRoutes = {
    admin: [
      { name: 'Accueil', icon: "pi pi-home", route:"/home" },
      { name: 'Parametrages', icon:"pi pi-cog", route:"" },
      { name: 'Clients', icon:"pi pi-user", route:"" }
    ],
    mecano: [], 
    user: [
      { name: 'Accueil', icon:"pi pi-home", route:"/home" },
      { name: 'Services', icon:"pi pi-briefcase", route:"" },
      { name: 'Factures', icon:"pi pi-book", route:"" }
    ]
  };
  