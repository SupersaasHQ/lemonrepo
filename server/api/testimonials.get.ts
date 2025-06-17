export default defineEventHandler(async (event) => {
  return hubKV().getItem<Testimonial[]>("testimonials", {
    defaultValue: [],
  });
})
