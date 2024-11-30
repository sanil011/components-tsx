import ImageSlider from "./components/imageSlider";
export default function Home() {
  return (
    <div className="bg-white text-black grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-2xl font-semibold">Image comparison slider</h1>
      <ImageSlider
        width='500px'
        height='500px'
        image1={'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29rZXxlbnwwfHwwfHx8MA%3D%3D'}
        image2={'https://plus.unsplash.com/premium_photo-1725075086083-89117890371d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y29rZXxlbnwwfHwwfHx8MA%3D%3D'}
      />
    </div>
  );
}
