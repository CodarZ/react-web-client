import { type ConfigExternal, defineConfig, type OutputOptions } from 'orval';

interface ServiceConfig {
  /** 服务名称（用于生成目录） */
  name: string;
  swagger: string;
  overrides?: Partial<OutputOptions>;
}

const services: ServiceConfig[] = [
  {
    name: 'backend',
    swagger: 'http://127.0.0.1:8000/openapi',
  },
];

/** 创建服务配置 */
function createServiceConfig(config: ServiceConfig) {
  const { name, swagger, overrides } = config;
  const basePath = `./src/apis/generated/${name}`;

  const defaultOutput: OutputOptions = {
    clean: true,
    biome: true,
    indexFiles: true,
    mode: 'tags-split',
    httpClient: 'axios',
    client: 'react-query',
    target: `${basePath}/endpoints`,
    schemas: `${basePath}/schemas`,
    mock: {
      type: 'msw',
      delay: 500,
      useExamples: false,
      locale: 'zh_CN',
    },
    override: {
      mutator: {
        path: './src/apis/request/mutator.ts',
        name: 'orvalMutator',
      },
      query: {
        signal: true,
        options: {
          staleTime: 300000,
        },
      },
    },
  };

  return {
    output: {
      ...defaultOutput,
      ...overrides,
    },
    input: {
      target: swagger,
      override: {
        transformer: transformChineseTags,
      },
    },
    hooks: {
      afterAllFilesWrite: `node ./scripts/orval-generated.js`,
    },
  };
}

/**
 * 转换中文 tags 为英文
 * 从 API 路径中提取英文名称作为 tag
 * 例如：/sys/user/xxx -> sys-user
 */
function transformChineseTags(inputSchema: Record<string, unknown>) {
  const paths = inputSchema.paths as Record<string, Record<string, { tags?: string[] }>>;
  if (!paths) return inputSchema;

  for (const pathMethods of Object.values(paths)) {
    for (const operation of Object.values(pathMethods)) {
      if (operation?.tags) {
        operation.tags = operation.tags.map((tag: string) => {
          // 如果已经是英文，保持不变
          if (/^[a-zA-Z0-9-_]+$/.test(tag)) return tag;

          // 否则尝试从路径推断英文名称
          const pathKey = Object.keys(paths).find((p) => {
            const methods = paths[p];
            return Object.values(methods).some((op) => op?.tags?.includes(tag));
          });

          if (pathKey) {
            // /sys/user/list -> sys-user
            const parts = pathKey.split('/').filter(Boolean);
            if (parts.length >= 2) {
              return `${parts[0]}-${parts[1]}`;
            }
          }
          return tag;
        });
      }
    }
  }

  return inputSchema;
}

export default defineConfig(() => {
  const config: ConfigExternal = {};
  for (const service of services) {
    config[service.name] = createServiceConfig(service);
  }
  return config;
});
