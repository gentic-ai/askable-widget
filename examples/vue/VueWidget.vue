<template>
  <!-- Widget renders itself, no template needed -->
</template>

<script>
/**
 * Vue Component Example
 * 
 * This example shows how to integrate the Askable widget in a Vue application.
 */

export default {
  name: 'AskableWidget',
  props: {
    siteId: {
      type: String,
      required: true
    },
    apiBaseUrl: {
      type: String,
      default: undefined
    },
    position: {
      type: String,
      default: 'bottom-right',
      validator: (value) => ['bottom-right', 'bottom-left', 'top-right', 'top-left'].includes(value)
    },
    language: {
      type: String,
      default: 'en'
    },
    autoOpen: {
      type: Boolean,
      default: false
    },
    autoOpenDelayMs: {
      type: Number,
      default: undefined
    }
  },
  mounted() {
    this.loadWidget();
  },
  beforeUnmount() {
    this.destroyWidget();
  },
  watch: {
    siteId() {
      this.destroyWidget();
      this.loadWidget();
    },
    position() {
      this.destroyWidget();
      this.loadWidget();
    },
    language() {
      this.destroyWidget();
      this.loadWidget();
    }
  },
  methods: {
    loadWidget() {
      // Check if script is already loaded
      const existingScript = document.querySelector(
        'script[src="https://askable.gentic.in/versions/latest/askable-ws.js"]'
      );

      if (existingScript) {
        // Script already loaded, initialize widget
        if (window.initAskableWSWidget) {
          window.askableWSWidget = window.initAskableWSWidget({
            siteId: this.siteId,
            apiBaseUrl: this.apiBaseUrl,
            position: this.position,
            language: this.language,
            autoOpen: this.autoOpen,
            autoOpenDelayMs: this.autoOpenDelayMs,
          });
        }
        return;
      }

      // Load the Askable widget script
      const script = document.createElement('script');
      script.src = 'https://askable.gentic.in/versions/latest/askable-ws.js';
      script.async = true;
      script.onload = () => {
        // Initialize widget after script loads
        if (window.initAskableWSWidget) {
          window.askableWSWidget = window.initAskableWSWidget({
            siteId: this.siteId,
            apiBaseUrl: this.apiBaseUrl,
            position: this.position,
            language: this.language,
            autoOpen: this.autoOpen,
            autoOpenDelayMs: this.autoOpenDelayMs,
          });
        }
      };

      document.body.appendChild(script);
    },
    destroyWidget() {
      if (window.askableWSWidget) {
        window.askableWSWidget.destroy();
        window.askableWSWidget = undefined;
      }
    }
  }
};

/**
 * Usage Example:
 * 
 * <template>
 *   <div id="app">
 *     <h1>My Vue App</h1>
 *     <AskableWidget 
 *       site-id="your-site-id"
 *       position="bottom-right"
 *       language="en"
 *     />
 *   </div>
 * </template>
 * 
 * <script>
 * import AskableWidget from './components/AskableWidget.vue';
 * 
 * export default {
 *   name: 'App',
 *   components: {
 *     AskableWidget
 *   }
 * };
 * </script>
 */
</script>
