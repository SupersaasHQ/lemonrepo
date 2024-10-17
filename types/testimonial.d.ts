type Testimonial = {
  title: string
  quote: string
  author: {
    name: string
    description: string
    avatar: {
      src: string
      loading: "lazy"
    }
  }
}
