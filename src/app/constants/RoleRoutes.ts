interface RoleRoutes {
    admin: { name?: string, icon?: string, route?: string }[];
    mecano: { name?: string, icon?: string, route?: string }[]; 
    user: { name?: string, icon?: string, route?: string }[];
}
  
  export const roleRoutes: RoleRoutes = {
    admin: [
      { name: 'Accueil', icon: "pi pi-home", route:"/admin/home" },
      { name: 'Parametrages', icon:"pi pi-cog", route:"/admin/settings"},
      { name: 'Clients', icon:"pi pi-user", route:"" }
    ],
    mecano: [
      { name: 'Accueil', icon:"pi pi-home", route:"/mecano/home" },
      { name: 'Details-service', icon:"pi pi-briefcase", route:"/mecano/details-service/:id" },
    ], 
    user: [
      { name: 'Accueil', icon:"pi pi-home", route:"/home" },
      { name: 'Services', icon:"pi pi-briefcase", route:"" },
      { name: 'Factures', icon:"pi pi-book", route:"" }
    ]
  };
  