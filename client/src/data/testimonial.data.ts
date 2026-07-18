export type Testimonial = {
  id: string
  name: string
  handle: string
  avatar: string
  quote: string
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Marcus Reid",
    handle: "@marcusreid",
    avatar: "https://i.pravatar.cc/150?img=11",
    quote:
      "Volt Shift V1 changed my morning runs entirely. The cushioning is insane, felt like running on air from mile one.",
  },
  {
    id: "t2",
    name: "Aisha Okonkwo",
    handle: "@aishao",
    avatar: "https://i.pravatar.cc/150?img=47",
    quote:
      "I've tried every performance shoe on the market. Nothing hits like the Volt Apex. Carbon plate, responsive foam, it's just different.",
  },
  {
    id: "t3",
    name: "Jordan Park",
    handle: "@jordanpark",
    avatar: "https://i.pravatar.cc/150?img=33",
    quote:
      "The Stratus is my go-to for court days. Lateral support is unreal and they still look clean off the court.",
  },
  {
    id: "t4",
    name: "Lena Müller",
    handle: "@lenamuller",
    avatar: "https://i.pravatar.cc/150?img=23",
    quote:
      "Ordered the Mono-Slip for recovery days. Now I wear them everywhere. Comfort level is unfair.",
  },
]
