from django.urls import path, include
from .views import AuthURL, spotify_callback, IsAuthenticated, DataView, Logout, CreateWrapped, GetWrappeds, DeleteAccount, DeleteWrapped

urlpatterns = [
    path('get-auth-url', AuthURL.as_view()),
    path('redirect', spotify_callback),
    path('is-authenticated', IsAuthenticated.as_view()),
    path('get-data/<str:query>', DataView.as_view(), name = "get-data"),
    #path('games/', include('games.urls'))
    path('logout', Logout.as_view()),
    path('create-wrapped', CreateWrapped.as_view(), name = 'create-wrapped'),
    path('get-wrappeds', GetWrappeds.as_view(), name = 'get-wrappeds'),
    path('delete-account', DeleteAccount.as_view(), name = 'delete-account'),
    path('delete-wrapped/<str:wrap_id>', DeleteWrapped.as_view(), name = 'delete-wrapped')
]
