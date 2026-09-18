/**
 * 자기 자신을 제거하는 서비스 워커.
 *
 * 초기 셋업에 포함돼 있던 gatsby-plugin-offline 을 의존성에서만 걷어내는 바람에,
 * 그 시기에 사이트를 방문한 브라우저에는 workbox 서비스 워커가 그대로 남았다.
 * 등록된 워커는 sw.js 가 404 가 되어도 스스로 사라지지 않기 때문에,
 * 옛 빌드의 앱 셸을 계속 캐시에서 꺼내 쓰다가 사라진 청크를 찾지 못해 실패한다.
 *
 * 이 파일은 그 워커를 대체해 캐시를 비우고 등록을 해제한 뒤, 열려 있는 탭을 새로 고친다.
 * 방문자 캐시가 충분히 정리되면 파일째 삭제하면 된다.
 */

self.addEventListener('install', () => {
  // 대기 없이 곧바로 기존 워커를 대체한다
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const cacheKeys = await caches.keys();
      await Promise.all(cacheKeys.map((key) => caches.delete(key)));

      await self.registration.unregister();

      // 이미 열려 있는 탭은 옛 번들을 실행 중이므로 새로 고쳐야 한다
      const clients = await self.clients.matchAll({ type: 'window' });
      clients.forEach((client) => client.navigate(client.url));
    })()
  );
});
