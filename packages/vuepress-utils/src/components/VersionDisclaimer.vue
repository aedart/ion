<template>
    <div :class="css">
        <label>
            {{ label }}
        </label>

        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

/**
 * Version Disclaimer
 */
export default defineComponent({
    name: 'VersionDisclaimer',
    
    props: {

        /**
         * The type of warning... or info
         */
        type: {
            type: String,
            default: 'warning'
        }
    },
    
    setup(props) {
        const type = props.type;
        
        const css = computed(() => {
            return {
                'version-disclaimer': true,
                [type]: true
            }
        });
        
        const label = computed(() => {
            switch (type) {
                case 'info':
                    return 'Info';

                case 'warning':
                default:
                    return 'Warning';
            }
        });
        
        return {
            css,
            label,
            type
        }
    }
});
</script>

<style lang="scss">
.version-disclaimer {
    max-width: var(--content-width);
    margin: 0 auto;
    padding: 1.2em;

    border-bottom: 1px solid var(--c-border);

    label {
        font-weight: bold;
        margin-right: 0.2em;

        &:after {
            content: ":"
        }
    }

    &.info {
        label {
            color: var(--c-tip);
        }
    }

    &.warning {
        label {
            color: var(--c-danger);
        }
    }
}
</style>