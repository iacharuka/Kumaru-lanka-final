/**
 * Component Template Example
 * 
 * This shows the recommended structure for component classes.
 * Copy and adapt this pattern for new components.
 */

class ComponentTemplate {
  /**
   * Initialize component
   * @param {string|Element} selector - CSS selector or DOM element
   * @param {Object} options - Component options
   */
  constructor(selector, options = {}) {
    this.element = typeof selector === 'string' 
      ? document.querySelector(selector) 
      : selector;
    
    if (!this.element) {
      console.warn(`Component element not found: ${selector}`);
      return;
    }
    
    this.options = { ...this.getDefaultOptions(), ...options };
    this.isVisible = false;
    
    this.init();
  }

  /**
   * Get default options for this component
   * @returns {Object} Default options
   */
  getDefaultOptions() {
    return {
      animationDuration: 300,
      closeOnEscape: true,
      closeOnClickOutside: false,
    };
  }

  /**
   * Initialize component
   */
  init() {
    this.render();
    this.bindEvents();
    this.attachObservers();
  }

  /**
   * Render component DOM
   */
  render() {
    // Build and insert HTML
    this.element.innerHTML = this.getHTML();
  }

  /**
   * Get component HTML template
   * @returns {string} HTML template string
   */
  getHTML() {
    return `
      <div class="component-wrapper">
        <div class="component-header">
          <h2 class="component-title">Component Title</h2>
          <button class="component-close-btn" aria-label="Close">×</button>
        </div>
        <div class="component-content">
          <!-- Content goes here -->
        </div>
      </div>
    `;
  }

  /**
   * Bind event listeners
   */
  bindEvents() {
    // Close button
    const closeBtn = this.element.querySelector('.component-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.close());
    }

    // Escape key
    if (this.options.closeOnEscape) {
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isVisible) {
          this.close();
        }
      });
    }

    // Click outside
    if (this.options.closeOnClickOutside) {
      this.element.addEventListener('click', (e) => {
        if (e.target === this.element) {
          this.close();
        }
      });
    }
  }

  /**
   * Attach observers (IntersectionObserver, MutationObserver, etc.)
   */
  attachObservers() {
    // Example: Use IntersectionObserver for lazy loading
    // const observer = new IntersectionObserver((entries) => {
    //   entries.forEach(entry => {
    //     if (entry.isIntersecting) {
    //       this.loadContent();
    //       observer.unobserve(entry.target);
    //     }
    //   });
    // });
    // observer.observe(this.element);
  }

  /**
   * Open/show component
   */
  open() {
    this.element.classList.add('is-visible');
    this.isVisible = true;
    this.element.setAttribute('aria-hidden', 'false');
    this.onOpen();
  }

  /**
   * Close/hide component
   */
  close() {
    this.element.classList.remove('is-visible');
    this.isVisible = false;
    this.element.setAttribute('aria-hidden', 'true');
    this.onClose();
  }

  /**
   * Lifecycle: Called when component opens
   */
  onOpen() {
    // Override in child classes
  }

  /**
   * Lifecycle: Called when component closes
   */
  onClose() {
    // Override in child classes
  }

  /**
   * Update component data
   * @param {Object} data - New data
   */
  update(data) {
    this.options = { ...this.options, ...data };
    this.render();
  }

  /**
   * Destroy component and clean up
   */
  destroy() {
    this.element.removeEventListener('click', this.handleClickOutside);
    document.removeEventListener('keydown', this.handleEscape);
    this.element.innerHTML = '';
  }

  /**
   * Toggle visibility
   */
  toggle() {
    if (this.isVisible) {
      this.close();
    } else {
      this.open();
    }
  }
}

export default ComponentTemplate;
