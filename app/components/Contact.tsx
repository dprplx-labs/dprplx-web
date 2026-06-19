import ContactForm from './ContactForm'

export default function Contact() {
  return (
    <section className="px-8 md:px-16 lg:px-24 py-32 md:py-48 border-t border-zinc-900">
      <div className="max-w-5xl">
        <p className="text-[11px] font-light tracking-[0.45em] text-[#87B1FF] uppercase mb-16">
          Contact
        </p>

        <h2 className="text-3xl sm:text-4xl font-extralight text-zinc-100 tracking-tight leading-tight mb-8">
          Let&apos;s talk.
        </h2>

        <p className="text-[15px] font-light text-zinc-400 leading-7 max-w-sm mb-14">
          Whether you want to work together, partner, or just compare notes on
          what comes next — start here.
        </p>

        <ContactForm />
      </div>
    </section>
  )
}
