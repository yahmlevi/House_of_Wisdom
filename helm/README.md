TEST IF RENDERED CORRECTLY - helm template [NAME] [CHART_DIR]

INSTALL CHART - helm install [NAME] [CHART_DIR]

--------------------------------------------------------------------------
Prometheus and Grafana from helm chart - https://github.com/prometheus-community/helm-charts --> https://github.com/prometheus-community/helm-charts/tree/main/charts/kube-prometheus-stack | https://www.magalix.com/blog/monitoring-of-kubernetes-cluster-through-prometheus-and-grafana

1. add repo - 'helm repo add prometheus-community https://prometheus-community.github.io/helm-charts'
2. 'helm search repo prometheus-community'
3. install chart - 'helm install prometheus prometheus-community/kube-prometheus-stack -n [NAMESPACE]'
4. port forward prometheus-grafana pod - 'kubectl port-forward -n [NAMESPACE] [GRAFANA_POD] [PORT]'
5. login to Grafana - 'kubectl get secret -n [NAMESPACE] prometheus-grafana -o yaml'
6. base64 decode username and password - https://www.base64decode.org/
--------------------------------------------------------------------------
kubectl get prometheus -A

nginx ingress controller helm

install prometheus chart on monitoring ns, then install jenkins chart on jenkins ns - monitoring will happen by itself