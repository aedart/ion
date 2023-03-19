<template>
  <div :class="css">
    <label>
      {{ label }}
    </label>

    <slot></slot>
  </div>
</template>
<script>

/**
 * Custom "version warning"
 */
export default {
  name: 'Version Warning',

  props: {
    /**
     * The type of warning... or info
     */
    type: {
      type: String,
      default: 'warning'
    }
  },

  computed: {

    /**
     * Css
     *
     * @return {object}
     */
    css() {
      return {
        'version-disclaimer': true,
        [this.type]: true
      }
    },

    label() {
      switch (this.type) {
        case 'info':
          return 'Info';

        case 'warning':
        default:
          return 'Warning';
      }
    }
  }
}
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
