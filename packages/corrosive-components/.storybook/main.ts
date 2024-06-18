import { StorybookConfig } from 'storybook-framework-qwik'

const config: StorybookConfig = {
    addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
    framework: {
        name: 'storybook-framework-qwik',
    },
    core: {
        renderer: 'storybook-framework-qwik',
    },
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

    viteFinal: async (config, options) => {
        const { qwikVite: qwikVite } = await import(
            '@builder.io/qwik/optimizer'
        )
        config.plugins?.unshift(qwikVite())
        return config
    },
}

export default config
