import { BlogPost } from '../../components/BlogPost';

export default function Post() {
  return (
    <BlogPost>
      <h2 id='tldr'>TLDR;</h2>
      <p>
        Before publishing Typescript or really any JS package to npm, test with{' '}
        <code>npm pack</code>.
      </p>
      <p>Inside package to publish:</p>
      <pre>
        <code
          dangerouslySetInnerHTML={{
            __html: `~/package $ npm pack
...
npm notice === Tarball Details ===
npm notice name: package
npm notice version: 0.0.0
npm notice filename: package-0.0.0.tgz
....`,
            // .split('\n')
            // .map(line => line.trim())
            // .join('\n'),
          }}
        />
      </pre>

      <p>
        With the tar just generated at <code>~/package/package-0.0.0.tar</code>,
        Inside test project with dependency:
      </p>

      <pre>
        <code
          dangerouslySetInnerHTML={{
            __html: `
~/project $ npm install ~/package/package-0.0.0.tgz
~/project $ npm run start
        `.trim(),
          }}
        />
      </pre>

      <p>Make sure to:</p>

      <ul>
        <li>
          In you package.json, have <code>main</code> set to{' '}
          <code>dist/index.js</code> without the prepended <code>./</code>
        </li>

        <li>
          In you package.json, make sure <code>prepack</code> is a script set to{' '}
          <code>npm run build</code>
        </li>
      </ul>

      <p>
        Your <code>package.json</code> should look something like:
      </p>

      <pre>
        <code>
          {` {
  "name": "package",
  "version": "0.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc -d",
    "prepack": "npm run build"
  },
}
`}
        </code>
      </pre>

      <h1 id='explanation'>Explanation</h1>

      <p>
        When developing on Cloudflare Worker's package{' '}
        <a href='https://github.com/cloudflare/kv-asset-handler'>
          kv-static-asset-handler
        </a>{' '}
        I saw how valuable adding TypeScript would be.{' '}
      </p>

      <p>
        With my teammates on board with TypeScript I tested the package, but I
        made the mistake just using npm link. <code>npm link</code> is great for
        developing packages where you want to test the client fast, but it
        doesn't replicate the build steps of publishing on npm. This lead us to
        publishing to npm with just the <code>.ts</code> files and without the
        corerect <code>.js</code> and <code>.d.js</code> files needed for other
        projects to use it.
      </p>

      <h2 id='npmpack'>
        <code>npm pack</code>
      </h2>

      <p>
        The first and often hardest part of solving a problem is accurately
        replicating the problem. This is where <code>npm pack</code> comes in.{' '}
        <code>npm pack</code> will create a tar ball that performs all the steps
        NPM does on publish (<code>prepack</code>, <code>post publish</code>,
        ..) . For more information on what scripts are ran when with npm see{' '}
        <a href='https://docs.npmjs.com/misc/scripts'>NPM scripts doc</a>. Npm
        pack now allows use to get a non assuming local testing environment.
      </p>

      <pre>
        <code> ~/package $ npm pack ... package-0.0.0.tgz</code>
      </pre>

      <p>
        Now we have a local version ready of the tar file that will actually be
        published on NPM without having to publish.{' '}
      </p>

      <h2 id='testtheinstall'>Test the Install</h2>

      <p>
        To install the local tarball run <code>npm install</code> with the path
        of the <code>.tgz</code> parent directory:
      </p>

      <pre>
        <code>npm install ~/package/package-0.0.0.tgz</code>
      </pre>

      <p>
        Testing the install now gives us a really funky and useless error code:
      </p>

      <pre>
        <code
          dangerouslySetInnerHTML={{
            __html: `
resolve 'package' in '/Users/victoriabernard/test/project/workers-site'
Parsed request is a module
using description file: /Users/victoriabernard/test/project/workers-site/package.json (relative path: .)
  Field 'browser' doesn't contain a valid alias configuration
  resolve as module
    /Users/victoriabernard/node_modules doesn't exist or is not a directory
    /Users/node_modules doesn't exist or is not a directory
    /node_modules doesn't exist or is not a directory
    looking for modules in /Users/victoriabernard/test/project/workers-site/node_modules
      using description file: /Users/victoriabernard/test/project/workers-site/package.json (relative path: ./node_modules)
        Field 'browser' doesn't contain a valid alias configuration
    looking for modules in /Users/victoriabernard/test/project/node_modules
      using description file: /Users/victoriabernard/test/project/package.json (relative path: ./node_modules)
        Field 'browser' doesn't contain a valid alias configuration
    looking for modules in /Users/victoriabernard/test/node_modules
      using description file: /Users/victoriabernard/test/package.json (relative path: ./node_modules)
        Field 'browser' doesn't contain a valid alias configuration
        using description file: /Users/victoriabernard/test/project/workers-site/node_modules/@cloudflare/kv-asset-handler/package.json (relative path: .)
          no extension
            Field 'browser' doesn't contain a valid alias configuration
        using description file: /Users/victoriabernard/test/project/node_modules/@cloudflare/kv-asset-handler/package.json (relative path: .)
          no extension

...
        `.trim(),
          }}
        />
      </pre>

      <p>
        And this{' '}
        <code>Field 'browser' doesn't contain a valid alias configuration</code>{' '}
        went on and on. I was very confused and assumed this had something to do
        with the fact Workers uses a framework based on Service Workers and not
        node or vanilla browser JS.
      </p>

      <p>
        After some intense googling I realized that this probably had nothing to
        do with browsers, node, or service worker but that something could be
        going on with confused imports.
      </p>

      <h2 id='fixthebugs'>Fix the bugs</h2>

      <p>
        Looking back at the output when my tarball was created with{' '}
        <code>npm pack</code>:
      </p>

      <pre>
        <code
          dangerouslySetInnerHTML={{
            __html: ` 
~/package $ npm pack
npm notice
npm notice 📦 package@0.0.0
npm notice === Tarball Contents ===
npm notice 90B .prettierrc
npm notice 9.7kB LICENSE_APACHE
npm notice 1.1kB LICENSE_MIT
npm notice 940B package.json
npm notice 290B tsconfig.json
npm notice 4.4kB CHANGELOG.md
npm notice 7.6kB src/test/getAssetFromKV.ts
npm notice 7.0kB src/index.ts
npm notice 927B src/test/mapRequestToAsset.ts
npm notice 1.7kB src/mocks.ts
npm notice 1.2kB src/test/serveSinglePageApp.ts
npm notice 1.2kB src/types.ts
npm notice 489B .github/workflows/test.yml
npm notice === Tarball Details ===
npm notice name: package
npm notice version: 0.0.0
npm notice filename: package-0.0.0.tgz
npm notice package size: 11.2 kB
npm notice unpacked size: 36.7 kB
npm notice shasum: 08c4b718d1328bd32690983793d9ce0be37a5a5e
npm notice integrity: sha512-29zlfXbSlJEuC[...]S2qhbnwINeeJA==
npm notice total files: 13
npm notice
package-0.0.0.tgz`.trim(),
          }}
        />
      </pre>

      <p>
        We see a tarball is created with the contents all <code>.ts</code>,{' '}
        <code>.json</code> and <code>.md</code> files, but clearly no{' '}
        <code>.js</code> files. I really need to get better at ready the output
        of things. <code>prepack</code> needed to be set to npm run build.
      </p>

      <pre>
        <code>
          {`{
  "name": "package",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "scripts": {
    "build": "tsc -d",
    "prepack": "npm run build"
  },
}`}
        </code>
      </pre>

      <p>
        Now with <code>prepack</code> set in my package.json, I run npm pack
        again.
      </p>

      <pre>
        <code
          dangerouslySetInnerHTML={{
            __html: ` ~/package $ npm pack
 npm notice
 npm notice 📦  package@0.0.0
 npm notice === Tarball Contents ===
 npm notice 90B   .prettierrc
 npm notice 9.7kB LICENSE_APACHE
 npm notice 1.1kB LICENSE_MIT
 npm notice 940B  package.json
 npm notice 290B  tsconfig.json
 npm notice 4.4kB CHANGELOG.md
 npm notice 7.6kB src/test/getAssetFromKV.ts
 npm notice 7.0kB src/index.ts
 npm notice 927B  src/test/mapRequestToAsset.ts
 npm notice 1.7kB src/mocks.ts
 npm notice 1.2kB src/test/serveSinglePageApp.ts
 npm notice 1.2kB src/types.ts
 npm notice 489B  .github/workflows/test.yml
 npm notice === Tarball Details ===
 npm notice name:          package
 npm notice version:       0.0.0
 npm notice filename:      package-0.0.0.tgz
 npm notice package size:  11.2 kB
 npm notice unpacked size: 36.7 kB
 npm notice shasum:        08c4b718d1328bd32690983793d9ce0be37a5a5e
 npm notice integrity:     sha512-29zlfXbSlJEuC[...]S2qhbnwINeeJA==
 npm notice total files:   13
 npm notice
 package-0.0.0.tgz`.trim(),
          }}
        />
      </pre>

      <p>
        I see though npm run build is running on pack, the packed contents are
        still the <code>.ts</code> files. Main was set but with the{' '}
        <code>./</code> which lead npm to default to <code>src/index</code>. I
        needed to strip the <code>./</code>.
      </p>

      <p>
        Now I really see the correct <code>.js</code> files are outputted :
      </p>

      <pre>
        <code>
          {`npm pack

> @cloudflare/kv-asset-handler@0.0.8 prepack /Users/victoriabernard/cf-github/kv-asset-handler
> npm run build


> @cloudflare/kv-asset-handler@0.0.8 build /Users/victoriabernard/cf-github/kv-asset-handler
> tsc -d

npm notice
npm notice 📦  @cloudflare/kv-asset-handler@0.0.8
npm notice === Tarball Contents ===
npm notice 90B     .prettierrc
npm notice 9.7kB   LICENSE_APACHE
npm notice 1.1kB   LICENSE_MIT
npm notice 19.7kB  dist/test/getAssetFromKV.js
npm notice 10.8kB  dist/index.js
npm notice 4.1kB   dist/test/mapRequestToAsset.js
npm notice 4.8kB   dist/mocks.js
npm notice 4.5kB   dist/test/serveSinglePageApp.js
npm notice 2.6kB   dist/types.js
npm notice 1.1kB   package.json
npm notice 290B    tsconfig.json
npm notice 4.4kB   CHANGELOG.md
npm notice 6.9kB   README.md
npm notice 185.0kB cloudflare-kv-asset-handler-0.0.8.tgz
npm notice 11B     dist/test/getAssetFromKV.d.ts
npm notice 7.6kB   src/test/getAssetFromKV.ts
npm notice 1.6kB   dist/index.d.ts
npm notice 7.0kB   src/index.ts
npm notice 11B     dist/test/mapRequestToAsset.d.ts
npm notice 927B    src/test/mapRequestToAsset.ts
npm notice 465B    dist/mocks.d.ts
npm notice 1.7kB   src/mocks.ts
npm notice 11B     dist/test/serveSinglePageApp.d.ts
npm notice 1.2kB   src/test/serveSinglePageApp.ts
npm notice 780B    dist/types.d.ts
npm notice 1.2kB   src/types.ts
npm notice 489B    .github/workflows/test.yml
npm notice === Tarball Details ===
npm notice name:          @cloudflare/kv-asset-handler
npm notice version:       0.0.8
npm notice filename:      cloudflare-kv-asset-handler-0.0.8.tgz
npm notice package size:  207.7 kB
npm notice unpacked size: 278.1 kB
npm notice shasum:        141e38d27bb7fe3488ed8b3645e41a03b315231d
npm notice integrity:     sha512-kNqQNrT/Y4961[...]vGciG+vGBweDw==
npm notice total files:   27
npm notice`}
        </code>
      </pre>

      <p>
        I test in back in the project folder, and see the import's are resolving
        correctly.{' '}
      </p>
    </BlogPost>
  );
}
