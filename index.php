<?php
$useCDN = false;
$base_url = $useCDN ? 'https://cdn.jsdelivr.net/gh/toroalbert/agurucdn/' : "./";
?>

<!DOCTYPE html>
<html lang="es" ng-app="app-root">

<head>
    <!-- <base href="https://cdn.jsdelivr.net/gh/toroalbert/agurucdn/"> -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>{{title}}</title>

    <!-- Custom fonts for this template-->
    <link href="<?= $base_url ?>vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet">

    <!-- Custom styles for this template-->
    <link href="<?= $base_url ?>css/sb-admin-2.css?v=0.1" rel="stylesheet">

    <style>
        #anime {
            z-index: 9;
            position: relative;
            width: 100%;
            height: 100%;
        }

        #anime article {
            height: 100%;
            padding-top: 33%;
        }

        #anime div {
            width: 3rem;
            height: 3rem;
            margin-top: auto;
            margin-bottom: auto;
            mix-blend-mode: lighten;
        }
    </style>
</head>

<body id="page-top" ng-class="{ 'bg-gradient-primary': !hasSession }">
    <!-- Page Wrapper -->
    <div ng-attr-id="{{ hasSession ? 'wrapper' : '' }}">
        <!-- Sidebar -->
        <ng-include src="'./views/template/sidebar.html'" ng-if="hasSession" class="bg-gradient-primary"></ng-include>
        <!-- End of Sidebar -->
        <!-- Content Wrapper -->
        <div ng-attr-id="{{ hasSession ? 'content-wrapper' : '' }}" ng-class="{ 'd-flex flex-column': hasSession }">

            <!-- Main Content -->
            <div ng-attr-id="{{ hasSession ? 'content' : '' }}">

                <!-- Topbar -->
                <ng-include src="'./views/template/topbar.html'" ng-if="hasSession"></ng-include>
                <!-- End of Topbar -->

                <!-- Begin Page Content -->
                <setion id="view" ng-view>

                </setion>
                <!-- /.container-fluid -->

            </div>
            <!-- End of Main Content -->

            <!-- Footer -->
            <ng-include src="'./views/template/footer.html'" ng-if="hasSession"></ng-include>
            <!-- End of Footer -->

        </div>
        <!-- End of Content Wrapper -->

    </div>
    <!-- End of Page Wrapper -->

    <!-- Scroll to Top Button-->
    <a class="scroll-to-top rounded" to="#page-top">
        <i class="fas fa-angle-up"></i>
    </a>

    <!-- Logout Modal-->
    <div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                    <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                <div class="modal-footer">
                    <button class="btn btn-secondary btn-LogOutClose" type="button" data-dismiss="modal">Cancel</button>
                    <a class="btn btn-primary" href="#!/logout">Logout</a>
                </div>
            </div>
        </div>
    </div>

    <preload></preload>

    <section id="scripts">
        <!-- Bootstrap core JavaScript-->
        <script src="<?= $base_url ?>vendor/jquery/jquery.min.js"></script>
        <script src="<?= $base_url ?>vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

        <!-- Core plugin JavaScript-->
        <script src="<?= $base_url ?>vendor/jquery-easing/jquery.easing.min.js"></script>

        <!-- Custom scripts for all pages-->
        <script src="<?= $base_url ?>js/sb-admin-2.min.js"></script>

        <!-- Page level plugins -->
        <script src="<?= $base_url ?>vendor/chart.js/Chart.min.js"></script>

        <!-- Page level custom scripts -->
        <!-- <script src="js/demo/chart-area-demo.js"></script>
        <script src="js/demo/chart-pie-demo.js"></script> -->

        <!-- Anime Animation scripts -->
        <script src="<?= $base_url ?>js/anime.min.js"></script>

        <!-- angular system -->
        <script src="<?= $base_url ?>vendor/angular/angular.min.js" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <script src="<?= $base_url ?>vendor/angular/angular-route.min.js" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <script src="<?= $base_url ?>js/main.js"></script>
    </section>
</body>

</html>