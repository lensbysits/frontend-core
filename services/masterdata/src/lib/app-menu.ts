import { MenuItem } from "@lens/app-abstract";

export const menu: MenuItem[] = [
	{
		translationKey: "menu.title",
		label: "Masterdata management",
		items: [
			{
				translationKey: "menu.items.masterdatas",
				label: "Masterdatas",
				icon: "pi pi-fw pi-briefcase",
				routerLink: ["/"]
			}
		]
	}
];
