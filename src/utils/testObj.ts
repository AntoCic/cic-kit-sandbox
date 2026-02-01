export const testObj = (title?: string) => {
    const fireRefLike = {
        id: 'u_9f3a2c',
        path: 'users/u_9f3a2c',
        firestore: { app: { name: 'demo' } }, // per isFirestoreDocRef()
    }

    const parentRefLike = {
        id: 'post_123',
        parent: { id: 'users/u_9f3a2c' }, // per isFirestoreDocRef()
    }

    const sym = Symbol('secret')

    const obj: any = {
        title,
        // meta
        _meta: {
            app: 'cic-kit-sandbox',
            env: 'dev',
            version: '5.8.0',
            createdAt: new Date(),
            updatedAt: new Date(Date.now() - 1000 * 60 * 12),
            big: 9007199254740993n, // bigint
            sym, // symbol
            fn: (x: number) => x * 2, // function
        },

        // key-based "ref" (deve diventare "[Ref]")
        ref: fireRefLike,

        // value-based Firestore ref-like (deve diventare "[Ref users/u_9f3a2c]")
        ownerRef: fireRefLike,
        lastEditorRef: parentRefLike,

        // "timestamp-like" (non è Date, quindi lo stringify lo tratta come object)
        timestampLike: {
            seconds: Math.floor(Date.now() / 1000),
            nanoseconds: 123000000,
            toDate: () => new Date(),
        },

        // dati realistici
        user: {
            uid: 'u_9f3a2c',
            email: 'mario.rossi@example.com',
            displayName: 'Mario Rossi',
            roles: ['admin', 'editor', 'beta'],
            flags: {
                newsletter: true,
                twoFactor: false,
                gdprConsent: true,
            },
            profile: {
                bio: 'Ciao! Qui testo safeStringify 😄',
                links: [
                    { label: 'GitHub', url: 'https://github.com/example' },
                    { label: 'Website', url: 'https://example.com' },
                ],
                address: {
                    country: 'IT',
                    city: 'Roma',
                    zip: '00100',
                    coords: { lat: 41.9028, lng: 12.4964 },
                },
            },
        },

        // oggetto con TANTE chiavi (utile per maxKeys)
        lotsOfKeys: Object.fromEntries(
            Array.from({ length: 140 }).map((_, i) => [
                `key_${String(i).padStart(3, '0')}`,
                i % 7 === 0 ? { nested: { level: i, ok: true } } : `value_${i}`,
            ])
        ),

        // array lungo (utile per maxArray)
        longArray: Array.from({ length: 120 }).map((_, i) => ({
            i,
            name: `Item ${i}`,
            tags: Array.from({ length: 8 }).map((__, t) => `t${t}`),
            ref: parentRefLike, // key-based "ref" dentro oggetto (deve diventare "[Ref]")
        })),

        // struttura profonda (utile per maxDepth)
        deepTree: {
            level0: {
                level1: {
                    level2: {
                        level3: {
                            level4: {
                                level5: {
                                    level6: {
                                        level7: {
                                            msg: 'Se maxDepth è 6 dovresti vedere [MaxDepth]',
                                            more: { evenMore: { wow: true } },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },

        // misc
        misc: {
            nullish: null,
            undef: undefined,
            bool: true,
            num: 42,
            str: 'hello',
            nestedArrays: [
                [1, 2, 3],
                ['a', 'b', 'c'],
                Array.from({ length: 80 }, (_, i) => i),
            ],
            mapLike: {
                // non è una Map vera (che non ha JSON), ma simula dataset
                entries: Array.from({ length: 20 }, (_, i) => [`k${i}`, { v: i }]),
            },
        },

        // error-like
        errorLike: {
            name: 'ValidationError',
            message: 'Something went wrong',
            stack: 'Error: ...\n  at demo.ts:1:1',
            cause: { code: 'E_BAD_INPUT', fields: ['email', 'password'] },
        },
    }

    // ciclo
    obj.circular = obj
    obj.user.self = obj.user
    return obj
}
