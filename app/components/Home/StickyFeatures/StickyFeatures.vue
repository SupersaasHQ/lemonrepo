<template>
  <div
    ref="stickySectionsContainer"
    class="max-w-6xl mx-auto lg:min-h-[var(--stick-items)] px-5 relative"
  >
    <div
      class="text-center static lg:absolute top-8 left-1/2 translate-x-0 lg:-translate-x-1/2 mb-8 lg:mb-0"
    >
      <h2
        class="mx-auto max-w-xl text-4xl sm:text-5xl font-semibold tracking-tight text-gray-900 font-display"
      >
        Lemonrepo has everything you need to build a SaaS
      </h2>
      <p class="mx-auto mt-4 max-w-xl text-gray-600 text-2xl">
        Made to launch without the headache.
      </p>
    </div>
    <div class="lg:sticky lg:top-0 lg:h-screen space-y-12 lg:space-y-0">
      <HomeStickyFeaturesSection
        title="Authentication"
        heading="Easy Login and User Management"
        description="We're all famililar with the pain of writing auth logic and the amount of use cases that come with it. I wanted to make it stupid simple and easy to use."
      >
        <HomeStickyFeaturesVideo
          src="https://essentials.supersaas.dev/essentials_passkeys.mp4"
        />
      </HomeStickyFeaturesSection>
      <HomeStickyFeaturesSection
        title="Payments"
        heading="Simple Billing Management"
        description="Supports Stripe and Lemonsqueezy with a simple and easy to use unified composable."
      >
        <HomeStickyFeaturesVideo
          src="https://essentials.supersaas.dev/essentials_posts-subs.mp4"
        />
      </HomeStickyFeaturesSection>
      <HomeStickyFeaturesSection
        title="Profile Settings"
        heading="Let users update their profile info"
        description="A simple way for users to manage and update their profile settings. It's not just functions, it looks beautiful."
      >
        <HomeStickyFeaturesVideo
          src="https://essentials.supersaas.dev/essentials_settings.mp4"
        />
      </HomeStickyFeaturesSection>
      <HomeStickyFeaturesSection
        title="File Storage"
        heading="Supports S3, Local file storage and NuxtHub"
        description="A unified composable for file storage with demos for Client Upload, Server upload and more."
      >
        <HomeStickyFeaturesVideo
          src="https://essentials.supersaas.dev/essentials_file-storage.mp4"
        />
      </HomeStickyFeaturesSection>
      <HomeStickyFeaturesSection
        title="Admin"
        heading="A beautiful admin panel"
        description="Manage users, ban users, manage subscriptions. View waitlist submissions. View all your transactions from Stripe or Lemonsqueezy. All in one place"
      >
        <HomeStickyFeaturesVideo
          src="https://essentials.supersaas.dev/essentials_admin.mp4"
        />
      </HomeStickyFeaturesSection>
    </div>
  </div>
</template>

<script setup>
const stickySectionsContainer = ref(null);

onMounted(() => {
  const stickySectionsInstance = new StickySections(
    stickySectionsContainer.value
  );
  window.addEventListener("scroll", stickySectionsInstance.onScroll);

  onBeforeUnmount(() => {
    window.removeEventListener("scroll", stickySectionsInstance.onScroll);
  });
});

class StickySections {
  constructor(containerElement) {
    this.container = {
      el: containerElement,
      height: 0,
      top: 0,
      bottom: 0,
    };
    this.sections = Array.from(this.container.el.querySelectorAll("section"));
    this.viewportTop = 0;
    this.activeIndex = 0;
    this.scrollValue = 0; // Scroll value of the sticky container
    this.onScroll = this.onScroll.bind(this);
    this.initContainer = this.initContainer.bind(this);
    this.handleSections = this.handleSections.bind(this);
    this.remapValue = this.remapValue.bind(this);
    this.init();
  }

  onScroll() {
    this.handleSections();
  }

  initContainer() {
    this.container.el.style.setProperty(
      "--stick-items",
      `${this.sections.length + 1}00vh`
    );
    this.container.el.classList.add("[&_*]:!transition-none");
    setTimeout(() => {
      this.container.el.classList.remove("[&_*]:!transition-none");
    }, 1);
  }

  handleSections() {
    this.viewportTop = window.scrollY;
    this.container.height = this.container.el.clientHeight;
    this.container.top = this.container.el.offsetTop;
    this.container.bottom = this.container.top + this.container.height;

    if (this.container.bottom <= this.viewportTop) {
      // The bottom edge of the stickContainer is above the viewport
      this.scrollValue = this.sections.length + 1;
    } else if (this.container.top >= this.viewportTop) {
      // The top edge of the stickContainer is below the viewport
      this.scrollValue = 0;
    } else {
      // The stickContainer intersects with the viewport
      this.scrollValue = this.remapValue(
        this.viewportTop,
        this.container.top,
        this.container.bottom,
        0,
        this.sections.length + 1
      );
    }
    this.activeIndex =
      Math.floor(this.scrollValue) >= this.sections.length
        ? this.sections.length - 1
        : Math.floor(this.scrollValue);

    this.sections.forEach((section, i) => {
      if (i === this.activeIndex) {
        section.style.setProperty("--stick-visibility", "1");
        section.style.setProperty("--stick-scale", "1");
      } else {
        section.style.setProperty("--stick-visibility", "0");
        section.style.setProperty("--stick-scale", ".8");
      }
    });
  }

  // This function remaps a value from one range to another range
  remapValue(value, start1, end1, start2, end2) {
    const remapped =
      ((value - start1) * (end2 - start2)) / (end1 - start1) + start2;
    return remapped > 0 ? remapped : 0;
  }

  init() {
    this.initContainer();
    this.handleSections();
  }
}
</script>
