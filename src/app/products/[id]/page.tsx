import ProgressBar from '@/components/progress-bar'
import Rating from '@/components/rating'

export default async function Page({ params }: { params: Promise<{ id: number }> }) {
    const { id } = await params
    return (
        <div className="flex flex-col items-center">
            <div className="products-page flex flex-col gap-y-4 p-8">
                <div className="flex gap-x-4 justify-between">
                    <div>
                        <h1 className="text-4xl font-bold">Product Numero Uno</h1>
                        <span className="text-base text-zinc-400">★ 3.1 (1.7K)</span>
                    </div>
                    <button>Add to Cart</button>
                </div>
                <div className="flex">
                    <div className="flex flex-col gap-y-2">
                        <h1 className="text-2xl font-semibold">About this Product</h1>
                        <p className="line-clamp-4">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut mollis ante, eget euismod lacus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin cursus scelerisque bibendum. Aliquam at orci hendrerit, laoreet sem a, aliquet ligula. Nam tempor aliquam dolor, et interdum libero pretium id. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Phasellus tempor est nisl, ultrices lobortis nibh dignissim id. Sed sapien ipsum, vehicula at nisi sed, sodales auctor neque. Nulla viverra finibus dolor id porta.
                            Sed venenatis purus nec iaculis elementum. Curabitur tristique purus eget arcu eleifend molestie. Fusce dictum at magna vitae interdum. Proin a lectus imperdiet justo eleifend ullamcorper. Etiam eu ligula a erat efficitur pulvinar. Nam eleifend dapibus risus, vitae aliquam justo ullamcorper eget. In ac cursus orci.
                            Pellentesque aliquet ipsum a nunc bibendum, sit amet tempor risus pulvinar. Duis sed aliquam metus. Nam tincidunt tortor sem, fringilla sodales ipsum rhoncus ac. Vivamus congue, ante id mattis luctus, nibh tellus bibendum sapien, eget sagittis ante ante in augue. Nulla eget ultricies est. In sollicitudin euismod lectus id cursus. Integer ac risus molestie, placerat tellus a, suscipit turpis. Duis euismod lacus non sem finibus sodales. Mauris lobortis, odio at varius imperdiet, augue enim eleifend justo, sit amet sagittis sapien ligula eget lectus. Duis nulla nunc, gravida ac cursus eu, vehicula id ante. Nunc sit amet auctor felis. Curabitur nec commodo nisi, ut elementum est. Nam quis neque vel massa tempor condimentum vitae eget libero. Etiam iaculis dictum erat at posuere. Morbi convallis aliquet lectus, et mattis velit mollis in. Ut sodales turpis a lectus faucibus, non consectetur nibh accumsan.
                        </p>
                    </div>
                </div>
                <div className="flex flex-col gap-y-4 items-center">
                    <div className="flex gap-x-6 w-max">
                        <div className="flex flex-col justify-center">
                            <h1 className="text-7xl font-extrabold">3.1</h1>
                            <span className="text-center">out of 5</span>
                        </div>
                        <div className="flex flex-col">
                            {Array.from({ length: 5 }, (_, i) => (
                                <div key={i} className="flex gap-x-2 items-center">
                                    <Rating rating={5 - i} />
                                    <ProgressBar progress={10} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}