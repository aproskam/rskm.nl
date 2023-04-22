<script>
  import ImaginePicture from "./Imagine/ImaginePicture.svelte";
  import NestedRichText from "./NestedRichText.svelte";

  export let fields;

  const imageData = {
    ...fields.introImage.fields,
    'id': fields.introImage.sys.id
  }
</script>

<section class="
flex flex-col
lg:flex-row
justify-center
h-screen
w-screen
items-center
">
  <div class="lg:block w-full lg:w-1/3 lg:h-full relative mb-8 lg:mb-0">
    <ImaginePicture 
      imageData={imageData} 
      transforms={['10x10', '160x160', '320x320', '480x480']} 
      imgLoading={'eager'}
      customClass={"lg:hidden rounded-full w-40 max-w-none mx-auto object-cover bg-[#fef3ea]"}
      height={'100'}
      width={'100'}
    />

    <ImaginePicture 
      imageData={imageData} 
      transforms={['100x0', '400x0', '800x0', '1200x0']} 
      imgLoading={'eager'}
      customClass={"hidden lg:block lg:rounded-none lg:absolute lg:inset-0 lg:w-full lg:h-full max-w-none object-cover bg-[#fef3ea]"}
      height={imageData.file.details.image.height};
      width={imageData.file.details.image.width};
    />
  </div>

  <div class="lg:w-2/3 p-4 lg:p-16 style--nested-copy">
    <NestedRichText richTextData={fields.introText} />
  </div>
</section>
