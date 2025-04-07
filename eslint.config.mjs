import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default tseslint.config(
	{
		ignores: ["node_modules", "dist", "build", "coverage", "app.log"],
	},
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	{
		files: ["**/*.ts"],
		rules: {
			// Add any specific ESLint rules here if needed
		},
	},
	eslintPluginPrettierRecommended
);
