const demoCode = async (context) => {
    await context.audioWorklet.addModule('ring-buffer-worklet-processor.mjs');
    const oscillator = new OscillatorNode(context);
    const ringBufferWorkletNode =
        new AudioWorkletNode(context, 'ring-buffer-worklet-processor', {
            processorOptions: {
                kernelBufferSize: 1024,
                channelCount: 1,
            },
        });

    oscillator.connect(ringBufferWorkletNode).connect(context.destination);
    oscillator.start();
};