import { computed, reactive, ref, watch } from "vue";

const layoutConfig = reactive({
	preset: "Aura",
	primary: "orange",
	surface: null,
	darkTheme: false,
	menuMode: "slim",
	layoutTheme: "primaryColor",
});

const layoutState = reactive({
	staticMenuDesktopInactive: false,
	overlayMenuActive: false,
	configSidebarVisible: false,
	staticMenuMobileActive: false,
	menuHoverActive: false,
	rightMenuActive: false,
	topbarMenuActive: false,
	sidebarActive: false,
	activeMenuItem: null,
	overlaySubmenuActive: false,
});

let tabs = ref([]);
const outsideClickListener = ref(null);

export function useLayout() {
	const setPrimary = (value) => {
		layoutConfig.primary = value;
	};

	const setSurface = (value) => {
		layoutConfig.surface = value;
	};

	const setPreset = (value) => {
		layoutConfig.preset = value;
	};

	const setMenuMode = (mode) => {
		layoutConfig.menuMode = mode;

		if (mode === "static") {
			layoutState.staticMenuDesktopInactive = false;
		}
	};

	const setLayoutTheme = (value) => {
		layoutConfig.layoutTheme = value;
	};

	const showConfigSidebar = () => {
		layoutState.configSidebarVisible = true;
	};

	const toggleDarkMode = () => {
		if (!document.startViewTransition) {
			executeDarkModeToggle();

			return;
		}

		document.startViewTransition(() => executeDarkModeToggle(event));
	};

	const executeDarkModeToggle = () => {
		layoutConfig.darkTheme = !layoutConfig.darkTheme;

		document.documentElement.classList.toggle("app-dark");
	};

	const setActiveMenuItem = (item) => {
		layoutState.activeMenuItem = item.value || item;
	};

	const setMenuStates = (value) => {
		layoutState.overlaySubmenuActive = value;
		layoutState.menuHoverActive = value;
	};

	const setStaticMenuMobile = () => {
		layoutState.staticMenuMobileActive = !layoutState.staticMenuMobileActive;
	};

	const watchSidebarActive = () => {
		watch(isSidebarActive, (newVal) => {
			if (newVal) {
				bindOutsideClickListener();
			} else {
				unbindOutsideClickListener();
			}
		});
	};

	const onMenuToggle = () => {
		if (layoutConfig.menuMode === "overlay") {
			layoutState.overlayMenuActive = !layoutState.overlayMenuActive;
		}

		if (window.innerWidth > 991) {
			layoutState.staticMenuDesktopInactive =
				!layoutState.staticMenuDesktopInactive;
		} else {
			layoutState.staticMenuMobileActive = !layoutState.staticMenuMobileActive;
		}
	};

	const onConfigSidebarToggle = () => {
		if (isSidebarActive.value) {
			resetMenu();
			unbindOutsideClickListener();
		}
		layoutState.configSidebarVisible = !layoutState.configSidebarVisible;
	};

	const openTab = (value) => {
		tabs.value = [...tabs.value, value];
	};
	const closeTab = (index) => {
		tabs.value.splice(index, 1);
		tabs.value = [...tabs.value];
	};

	const bindOutsideClickListener = () => {
		if (!outsideClickListener.value) {
			outsideClickListener.value = (event) => {
				if (isOutsideClicked(event)) {
					resetMenu();
				}
			};
			document.addEventListener("click", outsideClickListener.value);
		}
	};

	const unbindOutsideClickListener = () => {
		if (outsideClickListener.value) {
			document.removeEventListener("click", outsideClickListener.value);
			outsideClickListener.value = null;
		}
	};

	const isOutsideClicked = (event) => {
		const sidebarEl = document.querySelector(".layout-sidebar");
		const topbarEl = document.querySelector(".topbar-menubutton");

		return !(
			sidebarEl.isSameNode(event.target) ||
			sidebarEl.contains(event.target) ||
			topbarEl.isSameNode(event.target) ||
			topbarEl.contains(event.target)
		);
	};

	const resetMenu = () => {
		layoutState.overlayMenuActive = false;
		layoutState.overlaySubmenuActive = false;
		layoutState.staticMenuMobileActive = false;
		layoutState.menuHoverActive = false;
		layoutState.configSidebarVisible = false;
	};

	const isSidebarActive = computed(
		() =>
			layoutState.overlayMenuActive ||
			layoutState.staticMenuMobileActive ||
			layoutState.overlaySubmenuActive
	);

	const isDesktop = computed(() => window.innerWidth > 991);

	const isSlim = computed(() => layoutConfig.menuMode === "slim");
	const isSlimPlus = computed(() => layoutConfig.menuMode === "slim-plus");
	const isHorizontal = computed(() => layoutConfig.menuMode === "horizontal");
	const isOverlay = computed(() => layoutConfig.menuMode === "overlay");

	const isDarkTheme = computed(() => layoutConfig.darkTheme);
	const getPrimary = computed(() => layoutConfig.primary);
	const getSurface = computed(() => layoutConfig.surface);

	return {
		layoutConfig,
		layoutState,
		getPrimary,
		getSurface,
		isDarkTheme,
		setPrimary,
		setSurface,
		setPreset,
		setMenuMode,
		setLayoutTheme,
		showConfigSidebar,
		toggleDarkMode,
		onMenuToggle,
		setMenuStates,
		setStaticMenuMobile,
		watchSidebarActive,
		isSidebarActive,
		setActiveMenuItem,
		onConfigSidebarToggle,
		isSlim,
		isSlimPlus,
		isHorizontal,
		isDesktop,
		isOverlay,
		openTab,
		tabs,
		closeTab,
		unbindOutsideClickListener,
	};
}
