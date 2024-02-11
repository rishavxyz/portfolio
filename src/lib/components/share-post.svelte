<script>
	import Clipboard from "$lib/icons/clipboard.svelte";
	import Share from "$lib/icons/share.svelte";
	import { copy } from "svelte-copy";
	import { slide } from "svelte/transition";

	/**
	 * @type {{text: string, url: string}}
	 */
	export let data;

	let useFallback = false;
	let copied = false;
	let className = "";
	export { className as class };

	const socialUrls = [
		{
			name: "Twitter",
			href:
				"https://twitter.com/intent/tweet?" +
				new URLSearchParams({ text: data.text, url: data.url })
		},
		{
			name: "LinkedIn",
			href: "https://www.linkedin.com/shareArticle?mini=true&url=" + data.url
		},
		{
			name: "Facebook",
			href: "https://www.facebook.com/sharer/sharer.php?u=" + data.url
		},
		{
			name: "Reddit",
			href:
				"https://reddit.com/submit?selftext=true&" +
				new URLSearchParams({ title: data.text, url: data.url })
		},
		{
			name: "Telegram",
			href: "https://t.me/share/url?url=" + data.url
		},
		{
			name: "WhatsApp",
			href: "https://wa.me/?text=" + data.url
		}
	];

	function reset() {
		return setTimeout(() => {
			copied = false;
		}, 5000);
	}

	/** @type {import("svelte/action").Action<HTMLElement, Function>} */
	function clickOutside(node, callbackFunction) {
		/**
		 * @param {any} event
		 */
		function onClick(event) {
			if (!node.contains(event.target)) {
				callbackFunction();
			}
		}

		document.body.addEventListener("click", onClick);

		return {
			update(newCallbackFunction) {
				callbackFunction = newCallbackFunction;
			},
			destroy() {
				document.body.removeEventListener("click", onClick);
			}
		};
	}

	/**
	 *
	 * @param {KeyboardEvent} event
	 */
	function closeOnEscape(event) {
		return event.key == "Escape" && (useFallback = false);
	}
</script>

<div class="relative space-y-2">
	<button
		on:keyup={closeOnEscape}
		class="btn-icon bg-neutral-200 ring-neutral-500"
		title="Share this post"
		on:click|stopPropagation={async () => {
			if (!navigator.canShare || !navigator.share) return (useFallback = !useFallback);

			try {
				if (!navigator.canShare(data)) return (useFallback = !useFallback);

				await navigator.share(data);
			} catch {
				alert("There's a problem while sharing");
			}
		}}
	>
		<Share class={className} />
	</button>

	{#if useFallback === true}
		<article
			class="absolute right-0 top-full w-max space-y-4 rounded border-2 border-neutral-500 bg-neutral-200 p-3 shadow-lg"
			use:clickOutside={() => (useFallback = false)}
			transition:slide
		>
			<button
				class="inline-flex items-center gap-2"
				use:copy={data.url}
				on:svelte-copy={() => (copied = true) && reset()}
			>
				<Clipboard {copied} class="mt-1 h-5 w-5" />
				<span class="pt-0.5 text-sm">
					{#if copied}Copied to clipboard{:else}Copy link to clipboard{/if}
				</span>
			</button>

			<p class="label" id="media">Share on social media</p>
			<div class="flex flex-wrap gap-4">
				{#each socialUrls as { name, href }}
					<a {href} title="Share to {name}" target="_blank">
						{#if name === "Twitter"}
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="19.6" viewBox="0 0 256 209"
								><path
									fill="#55acee"
									d="M256 25.45a105.04 105.04 0 0 1-30.166 8.27c10.845-6.5 19.172-16.793 23.093-29.057a105.183 105.183 0 0 1-33.351 12.745C205.995 7.201 192.346.822 177.239.822c-29.006 0-52.523 23.516-52.523 52.52c0 4.117.465 8.125 1.36 11.97c-43.65-2.191-82.35-23.1-108.255-54.876c-4.52 7.757-7.11 16.78-7.11 26.404c0 18.222 9.273 34.297 23.365 43.716a52.312 52.312 0 0 1-23.79-6.57c-.003.22-.003.44-.003.661c0 25.447 18.104 46.675 42.13 51.5a52.592 52.592 0 0 1-23.718.9c6.683 20.866 26.08 36.05 49.062 36.475c-17.975 14.086-40.622 22.483-65.228 22.483c-4.24 0-8.42-.249-12.529-.734c23.243 14.902 50.85 23.597 80.51 23.597c96.607 0 149.434-80.031 149.434-149.435c0-2.278-.05-4.543-.152-6.795A106.748 106.748 0 0 0 256 25.45"
								/></svg
							>
						{/if}
						{#if name === "LinkedIn"}
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256"
								><path
									fill="#0A66C2"
									d="M218.123 218.127h-37.931v-59.403c0-14.165-.253-32.4-19.728-32.4c-19.756 0-22.779 15.434-22.779 31.369v60.43h-37.93V95.967h36.413v16.694h.51a39.907 39.907 0 0 1 35.928-19.733c38.445 0 45.533 25.288 45.533 58.186l-.016 67.013ZM56.955 79.27c-12.157.002-22.014-9.852-22.016-22.009c-.002-12.157 9.851-22.014 22.008-22.016c12.157-.003 22.014 9.851 22.016 22.008A22.013 22.013 0 0 1 56.955 79.27m18.966 138.858H37.95V95.967h37.97v122.16ZM237.033.018H18.89C8.58-.098.125 8.161-.001 18.471v219.053c.122 10.315 8.576 18.582 18.89 18.474h218.144c10.336.128 18.823-8.139 18.966-18.474V18.454c-.147-10.33-8.635-18.588-18.966-18.453"
								/></svg
							>
						{/if}
						{#if name === "Facebook"}
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256"
								><path
									fill="#1877F2"
									d="M256 128C256 57.308 198.692 0 128 0C57.308 0 0 57.307 0 128c0 63.888 46.808 116.843 108 126.445V165H75.5v-37H108V99.8c0-32.08 19.11-49.8 48.347-49.8C170.352 50 185 52.5 185 52.5V84h-16.14C152.958 84 148 93.867 148 103.99V128h35.5l-5.675 37H148v89.445c61.192-9.602 108-62.556 108-126.445"
								/><path
									fill="#FFF"
									d="m177.825 165l5.675-37H148v-24.01C148 93.866 152.959 84 168.86 84H185V52.5S170.352 50 156.347 50C127.11 50 108 67.72 108 99.8V128H75.5v37H108v89.445A128.959 128.959 0 0 0 128 256a128.9 128.9 0 0 0 20-1.555V165h29.825"
								/></svg
							>
						{/if}
						{#if name === "Reddit"}
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256"
								><circle cx="128" cy="128" r="128" fill="#FF4500" /><path
									fill="#FFF"
									d="M213.15 129.22c0-10.376-8.391-18.617-18.617-18.617a18.74 18.74 0 0 0-12.97 5.189c-12.818-9.157-30.368-15.107-49.9-15.87l8.544-39.981l27.773 5.95c.307 7.02 6.104 12.667 13.278 12.667c7.324 0 13.275-5.95 13.275-13.278c0-7.324-5.95-13.275-13.275-13.275c-5.188 0-9.768 3.052-11.904 7.478l-30.976-6.562c-.916-.154-1.832 0-2.443.458c-.763.458-1.22 1.22-1.371 2.136l-9.464 44.558c-19.837.612-37.692 6.562-50.662 15.872a18.74 18.74 0 0 0-12.971-5.188c-10.377 0-18.617 8.391-18.617 18.617c0 7.629 4.577 14.037 10.988 16.939a33.598 33.598 0 0 0-.458 5.646c0 28.686 33.42 52.036 74.621 52.036c41.202 0 74.622-23.196 74.622-52.036a35.29 35.29 0 0 0-.458-5.646c6.408-2.902 10.985-9.464 10.985-17.093ZM85.272 142.495c0-7.324 5.95-13.275 13.278-13.275c7.324 0 13.275 5.95 13.275 13.275s-5.95 13.278-13.275 13.278c-7.327.15-13.278-5.953-13.278-13.278Zm74.317 35.251c-9.156 9.157-26.553 9.768-31.588 9.768c-5.188 0-22.584-.765-31.59-9.768c-1.371-1.373-1.371-3.51 0-4.883c1.374-1.371 3.51-1.371 4.884 0c5.8 5.8 18.008 7.782 26.706 7.782c8.699 0 21.058-1.983 26.704-7.782c1.374-1.371 3.51-1.371 4.884 0c1.22 1.373 1.22 3.51 0 4.883Zm-2.443-21.822c-7.325 0-13.275-5.95-13.275-13.275s5.95-13.275 13.275-13.275c7.327 0 13.277 5.95 13.277 13.275c0 7.17-5.95 13.275-13.277 13.275Z"
								/></svg
							>
						{/if}
						{#if name === "Telegram"}
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256"
								><defs
									><linearGradient id="logosTelegram0" x1="50%" x2="50%" y1="0%" y2="100%"
										><stop offset="0%" stop-color="#2AABEE" /><stop
											offset="100%"
											stop-color="#229ED9"
										/></linearGradient
									></defs
								><path
									fill="url(#logosTelegram0)"
									d="M128 0C94.06 0 61.48 13.494 37.5 37.49A128.038 128.038 0 0 0 0 128c0 33.934 13.5 66.514 37.5 90.51C61.48 242.506 94.06 256 128 256s66.52-13.494 90.5-37.49c24-23.996 37.5-56.576 37.5-90.51c0-33.934-13.5-66.514-37.5-90.51C194.52 13.494 161.94 0 128 0Z"
								/><path
									fill="#FFF"
									d="M57.94 126.648c37.32-16.256 62.2-26.974 74.64-32.152c35.56-14.786 42.94-17.354 47.76-17.441c1.06-.017 3.42.245 4.96 1.49c1.28 1.05 1.64 2.47 1.82 3.467c.16.996.38 3.266.2 5.038c-1.92 20.24-10.26 69.356-14.5 92.026c-1.78 9.592-5.32 12.808-8.74 13.122c-7.44.684-13.08-4.912-20.28-9.63c-11.26-7.386-17.62-11.982-28.56-19.188c-12.64-8.328-4.44-12.906 2.76-20.386c1.88-1.958 34.64-31.748 35.26-34.45c.08-.338.16-1.598-.6-2.262c-.74-.666-1.84-.438-2.64-.258c-1.14.256-19.12 12.152-54 35.686c-5.1 3.508-9.72 5.218-13.88 5.128c-4.56-.098-13.36-2.584-19.9-4.708c-8-2.606-14.38-3.984-13.82-8.41c.28-2.304 3.46-4.662 9.52-7.072Z"
								/></svg
							>
						{/if}

						{#if name === "WhatsApp"}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24.19"
								viewBox="0 0 256 258"
								><defs
									><linearGradient id="logosWhatsappIcon0" x1="50%" x2="50%" y1="100%" y2="0%"
										><stop offset="0%" stop-color="#1FAF38" /><stop
											offset="100%"
											stop-color="#60D669"
										/></linearGradient
									><linearGradient id="logosWhatsappIcon1" x1="50%" x2="50%" y1="100%" y2="0%"
										><stop offset="0%" stop-color="#F9F9F9" /><stop
											offset="100%"
											stop-color="#FFF"
										/></linearGradient
									></defs
								><path
									fill="url(#logosWhatsappIcon0)"
									d="M5.463 127.456c-.006 21.677 5.658 42.843 16.428 61.499L4.433 252.697l65.232-17.104a122.994 122.994 0 0 0 58.8 14.97h.054c67.815 0 123.018-55.183 123.047-123.01c.013-32.867-12.775-63.773-36.009-87.025c-23.23-23.25-54.125-36.061-87.043-36.076c-67.823 0-123.022 55.18-123.05 123.004"
								/><path
									fill="url(#logosWhatsappIcon1)"
									d="M1.07 127.416c-.007 22.457 5.86 44.38 17.014 63.704L0 257.147l67.571-17.717c18.618 10.151 39.58 15.503 60.91 15.511h.055c70.248 0 127.434-57.168 127.464-127.423c.012-34.048-13.236-66.065-37.3-90.15C194.633 13.286 162.633.014 128.536 0C58.276 0 1.099 57.16 1.071 127.416Zm40.24 60.376l-2.523-4.005c-10.606-16.864-16.204-36.352-16.196-56.363C22.614 69.029 70.138 21.52 128.576 21.52c28.3.012 54.896 11.044 74.9 31.06c20.003 20.018 31.01 46.628 31.003 74.93c-.026 58.395-47.551 105.91-105.943 105.91h-.042c-19.013-.01-37.66-5.116-53.922-14.765l-3.87-2.295l-40.098 10.513l10.706-39.082Z"
								/><path
									fill="#FFF"
									d="M96.678 74.148c-2.386-5.303-4.897-5.41-7.166-5.503c-1.858-.08-3.982-.074-6.104-.074c-2.124 0-5.575.799-8.492 3.984c-2.92 3.188-11.148 10.892-11.148 26.561c0 15.67 11.413 30.813 13.004 32.94c1.593 2.123 22.033 35.307 54.405 48.073c26.904 10.609 32.379 8.499 38.218 7.967c5.84-.53 18.844-7.702 21.497-15.139c2.655-7.436 2.655-13.81 1.859-15.142c-.796-1.327-2.92-2.124-6.105-3.716c-3.186-1.593-18.844-9.298-21.763-10.361c-2.92-1.062-5.043-1.592-7.167 1.597c-2.124 3.184-8.223 10.356-10.082 12.48c-1.857 2.129-3.716 2.394-6.9.801c-3.187-1.598-13.444-4.957-25.613-15.806c-9.468-8.442-15.86-18.867-17.718-22.056c-1.858-3.184-.199-4.91 1.398-6.497c1.431-1.427 3.186-3.719 4.78-5.578c1.588-1.86 2.118-3.187 3.18-5.311c1.063-2.126.531-3.986-.264-5.579c-.798-1.593-6.987-17.343-9.819-23.64"
								/></svg
							>
						{/if}
					</a>
				{/each}
			</div>
		</article>
	{/if}
</div>
